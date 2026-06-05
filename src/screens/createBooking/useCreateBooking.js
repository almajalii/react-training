import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { TIME_SLOTS, DAY_SLOTS, MONTH_SLOTS } from '../../constants/times';
import {
  getProfessional,
  getAddresses,
  createBooking,
  getBookedSlots,
  uploadBookingImages,
} from '../../network/api';

const FULL_DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function buildDateSlots() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: DAY_SLOTS[d.getDay()],
      fullDay: FULL_DAY_NAMES[d.getDay()],
      num: d.getDate(),
      month: MONTH_SLOTS[d.getMonth()],
      iso: d.toISOString().split('T')[0],
    });
  }
  return days;
}

// Converts any time string the backend might return into minutes since midnight.
// Handles both "HH:mm" (24h) and "H:mm AM/PM" (12h) formats.
function toMinutes(timeStr) {
  if (!timeStr) return null;
  const s = timeStr.trim();

  // 12-hour: "8:00 AM", "8:00 PM", "12:00 PM" etc.
  const match12 = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match12) {
    let h = parseInt(match12[1], 10);
    const m = parseInt(match12[2], 10);
    const period = match12[3].toUpperCase();
    if (period === 'AM' && h === 12) h = 0;
    if (period === 'PM' && h !== 12) h += 12;
    return h * 60 + m;
  }

  // 24-hour: "08:00", "17:30"
  const match24 = s.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    return parseInt(match24[1], 10) * 60 + parseInt(match24[2], 10);
  }

  return null;
}

function isWithinWorkingHours(timeSlot, openTime, closeTime) {
  const slot = toMinutes(timeSlot);
  const open = toMinutes(openTime);
  const close = toMinutes(closeTime);
  if (slot == null || open == null || close == null) return true; // can't determine — don't block
  return slot >= open && slot <= close;
}

export default function useCreateBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    serviceName: '',
    serviceNameAr: '',
    servicePrice: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    address: '',
    addressId: '',
    images: [],
  });

  const set = (k, v) => setForm((f) => ({ ...f, ...(typeof k === 'object' ? k : { [k]: v }) }));

  const dateSlots = useMemo(() => buildDateSlots(), []);

  // ── Remote data ──────────────────────────────────────────────────────────

  const { data: pro, isLoading: proLoading } = useQuery({
    queryKey: ['professional', id],
    queryFn: () => getProfessional(id).then((res) => res?.data ?? res),
  });

  const { data: savedAddresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });

  const { data: bookedSlots = [] } = useQuery({
    queryKey: ['bookedSlots', id, form.scheduledDate],
    queryFn: () => getBookedSlots(id, form.scheduledDate),
    enabled: !!form.scheduledDate,
  });

  // ── Availability helpers ──────────────────────────────────────────────────

  const workingDayNames = useMemo(() => {
    if (!pro?.workingHours?.length) return null;
    return new Set(pro.workingHours.map((wh) => wh.day));
  }, [pro]);

  const workingHoursMap = useMemo(() => {
    if (!pro?.workingHours?.length) return {};
    return Object.fromEntries(pro.workingHours.map((wh) => [wh.day, wh]));
  }, [pro]);

  const isDayUnavailable = useCallback(
    (slot) => {
      if (!workingDayNames) return false;
      return !workingDayNames.has(slot.fullDay);
    },
    [workingDayNames]
  );

  const isTimeUnavailable = useCallback(
    (timeSlot) => {
      if (bookedSlots.includes(timeSlot)) return true;
      if (form.scheduledDate && workingDayNames) {
        const selectedSlot = dateSlots.find((d) => d.iso === form.scheduledDate);
        if (selectedSlot) {
          const wh = workingHoursMap[selectedSlot.fullDay];
          if (wh && !isWithinWorkingHours(timeSlot, wh.openTime, wh.closeTime)) return true;
        }
      }
      return false;
    },
    [bookedSlots, form.scheduledDate, workingDayNames, workingHoursMap, dateSlots]
  );

  // ── Image handling ────────────────────────────────────────────────────────

  const addImages = useCallback((files) => {
    const incoming = Array.from(files)
      .slice(0, 5)
      .map((file) => ({ uri: URL.createObjectURL(file), file }));
    setForm((f) => {
      const combined = [...f.images, ...incoming].slice(0, 5);
      return { ...f, images: combined };
    });
  }, []);

  const removeImage = useCallback((index) => {
    setForm((f) => {
      const next = [...f.images];
      URL.revokeObjectURL(next[index].uri);
      next.splice(index, 1);
      return { ...f, images: next };
    });
  }, []);

  // ── Booking submission ────────────────────────────────────────────────────

  const { mutate: submitBooking, isPending: submitting } = useMutation({
    mutationFn: async () => {
      // Upload images first to get real Azure URLs, then include them in the booking
      const imageUrls = form.images.length
        ? await uploadBookingImages(form.images.map((img) => img.file))
        : [];

      return createBooking({
        professionalId: id,
        serviceName: form.serviceName,
        serviceNameAr: form.serviceNameAr || undefined,
        servicePrice: form.servicePrice,
        scheduledDate: form.scheduledDate,
        scheduledTime: form.scheduledTime,
        address: form.address,
        description: form.description,
        imageUrls,
      });
    },
    onSuccess: () => setStep(4),
  });

  // ── Step gate logic ───────────────────────────────────────────────────────

  const canProceedStep1 = form.serviceName.length > 0 && form.description.trim().length > 5;

  const canProceedStep2 =
    form.scheduledDate.length > 0 &&
    form.scheduledTime.length > 0 &&
    form.address.trim().length > 2;

  const handleContinue = () => {
    if (step === 1 && !canProceedStep1) return;
    if (step === 2 && !canProceedStep2) return;
    if (step === 3) {
      submitBooking();
      return;
    }
    setStep((s) => s + 1);
  };

  // ── Selection helpers ─────────────────────────────────────────────────────

  const selectService = (svc) => {
    const priceStr =
      svc.minPrice != null && svc.maxPrice != null
        ? `${svc.minPrice} – ${svc.maxPrice} JD`
        : svc.minPrice != null
          ? `From ${svc.minPrice} JD`
          : t('pro_tbd');
    set({ serviceName: svc.name, serviceNameAr: svc.nameAr || '', servicePrice: priceStr });
  };

  const selectDate = (slot) => {
    if (isDayUnavailable(slot)) return;
    set({ scheduledDate: slot.iso, scheduledTime: '' });
  };

  const selectTime = (slot) => {
    if (isTimeUnavailable(slot)) return;
    set('scheduledTime', slot);
  };

  const selectAddress = (addr) => {
    const parts = [addr.area, addr.street];
    if (addr.buildingName) parts.push(addr.buildingName);
    if (addr.apartmentNumber) parts.push(`Apt ${addr.apartmentNumber}`);
    set({ address: parts.join(', '), addressId: addr.id });
  };

  const selectedDateLabel = useMemo(() => {
    const slot = dateSlots.find((d) => d.iso === form.scheduledDate);
    if (!slot) return '';
    return `${slot.label}, ${slot.month} ${slot.num}`;
  }, [form.scheduledDate, dateSlots]);

  return {
    t,
    i18n,
    pro,
    proLoading,
    step,
    setStep,
    form,
    set,
    dateSlots,
    savedAddresses,
    submitting,
    canProceedStep1,
    canProceedStep2,
    handleContinue,
    selectService,
    selectDate,
    selectTime,
    selectAddress,
    selectedDateLabel,
    navigate,
    isDayUnavailable,
    isTimeUnavailable,
    addImages,
    removeImage,
  };
}
