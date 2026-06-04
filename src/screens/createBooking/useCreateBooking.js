import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getProfessional, getAddresses, createBooking } from '../../network/api';
import { TIME_SLOTS, DAY_SLOTS, MONTH_SLOTS } from '../../constants/times';

// Build 7 selectable days starting from today
function buildDateSlots() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: DAY_SLOTS[d.getDay()],
      num: d.getDate(),
      month: MONTH_SLOTS[d.getMonth()],
      iso: d.toISOString().split('T')[0],
    });
  }
  return days;
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
  });

  // Accepts either a key+value pair or a partial object
  const set = (k, v) => setForm((f) => ({ ...f, ...(typeof k === 'object' ? k : { [k]: v }) }));

  // Pre-build date slots since they don't change and we want to avoid re-computing on every render
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

  const { mutate: submitBooking, isPending: submitting } = useMutation({
    mutationFn: () =>
      createBooking({
        professionalId: id,
        serviceName: form.serviceName,
        serviceNameAr: form.serviceNameAr || undefined,
        servicePrice: form.servicePrice,
        scheduledDate: form.scheduledDate,
        scheduledTime: form.scheduledTime,
        address: form.address,
        description: form.description,
        imageUrls: [], // deferred to v2
      }),
    onSuccess: () => setStep(4), // show success screen
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

  const selectDate = (slot) => set('scheduledDate', slot.iso);

  const selectTime = (time) => set('scheduledTime', time);

  const selectAddress = (addr) => {
    const parts = [addr.area, addr.street];
    if (addr.buildingName) parts.push(addr.buildingName);
    if (addr.apartmentNumber) parts.push(`Apt ${addr.apartmentNumber}`);
    set({ address: parts.join(', '), addressId: addr.id });
  };

  // Human-readable date label for the summary step
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
  };
}
