import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useMemo, useCallback } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getProfessional,
  getBookedSlots,
  getAddresses,
  createBooking,
  uploadBookingImages,
  // @ts-expect-error
} from '../../network/api'
import { buildDateSlots, isWithinWorkingHours } from '../../utils/bookingUtils'
import { step1Schema, step2Schema } from './createBookingValidation'
import type { BookingPro, BookingFormValues, BookingProService, DateSlot, SavedAddress } from '../../types/booking'

export default function useCreateBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const [step, setStep] = useState(1)
  const [image, setImage] = useState<{ uri: string; file: File } | null>(null)
  const dateSlots: DateSlot[] = useMemo(() => buildDateSlots(isAr), [isAr])

  //fetch pro details.
  const { data: pro, isLoading: proLoading } = useQuery<BookingPro>({
    queryKey: ['professional', id],
    queryFn: () => getProfessional(id).then((res: { data?: BookingPro } | BookingPro) => (res as any)?.data ?? res),
  })

  //fetch saved addresses.
  const { data: savedAddresses = [] } = useQuery<SavedAddress[]>({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  })

  // Formik manages all the form state and validation for steps 1-3.
  const formik = useFormik<BookingFormValues>({
    initialValues: {
      serviceName: '',
      serviceNameAr: '',
      servicePrice: '',
      description: '',
      scheduledDate: '',
      scheduledTime: '',
      address: '',
      addressId: '',
    },

    // validationSchema is dynamic, only validate the fields relevant to the current step.
    validationSchema: step === 1 ? step1Schema(t) : step === 2 ? step2Schema(t) : null,
    validateOnChange: true,
    validateOnBlur: true,

    // onSubmit handler, in step 3
    onSubmit: async (values, { setSubmitting }) => {
      try {
        //if images has anything in it, upload them, otherwise use an empty array
        const imageUrls = image ? await uploadBookingImages([image.file]) : []

        //create the booking
        // id is guaranteed defined here: this screen only renders the form once `pro` has
        // loaded successfully, which means the :id route param resolved to a real professional.
        await createBooking({
          professionalId: id!,
          serviceName: values.serviceName,
          serviceNameAr: values.serviceNameAr || undefined,
          servicePrice: values.servicePrice,
          scheduledDate: values.scheduledDate,
          scheduledTime: values.scheduledTime,
          address: values.address,
          description: values.description,
          imageUrls,
        })
        //navigate to success screen
        setStep(4)
      } catch {
        // error toast already fired by responseInterceptor
      } finally {
        setSubmitting(false)
      }
    },
  })

  //fetch booked slots
  const { data: bookedSlots = [] } = useQuery<string[]>({
    queryKey: ['bookedSlots', id, formik.values.scheduledDate],
    queryFn: () => getBookedSlots(id, formik.values.scheduledDate),
    enabled: !!formik.values.scheduledDate,
  })

  //pro working days names
  const workingDayNames = useMemo(() => {
    if (!pro?.workingHours?.length) return null
    return new Set(pro.workingHours.map(wh => wh.day))
  }, [pro])
  //pro working hours for a specifi day
  const workingHoursMap = useMemo(() => {
    if (!pro?.workingHours?.length) return {}
    return Object.fromEntries(pro.workingHours.map(wh => [wh.day, wh]))
  }, [pro])
  //gets called for the 7 days in the date picker to disable unavailable days
  const isDayUnavailable = useCallback(
    (slot: DateSlot) => {
      if (!workingDayNames) return false
      return !workingDayNames.has(slot.fullDay)
    },
    [workingDayNames]
  )
  // gets called for each time slot of the selected day to disable unavailable times
  const isTimeUnavailable = useCallback(
    (timeSlot: string) => {
      //booked by someone else & outside working hours.
      if (bookedSlots.includes(timeSlot)) return true
      if (formik.values.scheduledDate && workingDayNames) {
        const selectedSlot = dateSlots.find(d => d.iso === formik.values.scheduledDate)
        if (selectedSlot) {
          const wh = workingHoursMap[selectedSlot.fullDay]
          if (wh && !isWithinWorkingHours(timeSlot, wh.openTime, wh.closeTime)) return true
        }
      }
      return false //means its available
    },
    [bookedSlots, formik.values.scheduledDate, workingDayNames, workingHoursMap, dateSlots]
  )

  //handle image additon
  const addImage = useCallback(
    (file: File) => {
      // revoke previous blob URL before replacing it to free memory
      if (image) URL.revokeObjectURL(image.uri)
      setImage({ uri: URL.createObjectURL(file), file })
    },
    [image]
  )

  //handle image removal
  const removeImage = useCallback(() => {
    if (image) URL.revokeObjectURL(image.uri)
    setImage(null)
  }, [image])

  //builds price based on service selection, also sets the service name and price in formik values for submission later.
  const selectService = (svc: BookingProService) => {
    const priceStr =
      svc.minPrice != null && svc.maxPrice != null
        ? `${svc.minPrice} – ${svc.maxPrice} JD`
        : svc.minPrice != null
          ? `${t('browse_from')} ${svc.minPrice} JD`
          : t('pro_tbd')
    formik.setFieldValue('serviceName', svc.name, true)
    formik.setFieldValue('serviceNameAr', svc.nameAr || '', false)
    formik.setFieldValue('servicePrice', priceStr, false)
  }
  //handles date selection, also resets time selection since available times may change with date.
  const selectDate = (slot: DateSlot) => {
    if (isDayUnavailable(slot)) return
    formik.setFieldValue('scheduledDate', slot.iso, true)
    formik.setFieldValue('scheduledTime', '', false)
  }
  //handles time selection, sets the time in formik values for submission later.
  const selectTime = (slot: string) => {
    if (isTimeUnavailable(slot)) return
    formik.setFieldValue('scheduledTime', slot, true)
  }
  //handles address selection, sets the address string for submission and addressId for reference (if user wants to edit the address later, we can prefill the form with the selected address using the id).
  const selectAddress = (addr: SavedAddress) => {
    const parts = [addr.area, addr.street]
    if (addr.buildingName) parts.push(addr.buildingName)
    if (addr.apartmentNumber) parts.push(`Apt ${addr.apartmentNumber}`)
    formik.setFieldValue('address', parts.join(', '), true)
    formik.setFieldValue('addressId', addr.id, false)
  }
  //handles continue.
  const handleContinue = async () => {
    // Validate only the fields for the current step before advancing.
    const schema = step === 1 ? step1Schema(t) : step === 2 ? step2Schema(t) : null

    if (schema) {
      // touch all fields so errors show up in the UI
      const stepFields = Object.keys(schema.fields)
      stepFields.forEach(field => formik.setFieldTouched(field, true, false))

      // check if there are any errors
      const isValid = await schema.isValid(formik.values)

      // if not valid, stop here, errors are already visible from the touch above
      if (!isValid) return
    }

    if (step === 3) {
      formik.submitForm()
      return
    }

    setStep(s => s + 1)
  }
  //builds readable date label
  const selectedDateLabel = useMemo(() => {
    const slot = dateSlots.find(d => d.iso === formik.values.scheduledDate)
    if (!slot) return ''
    return `${slot.label}, ${slot.month} ${slot.num}`
  }, [formik.values.scheduledDate, dateSlots])

  return {
    t,
    i18n,
    pro,
    proLoading,
    step,
    setStep,
    formik,
    image,
    dateSlots,
    savedAddresses,
    handleContinue,
    selectService,
    selectDate,
    selectTime,
    selectAddress,
    selectedDateLabel,
    navigate,
    isDayUnavailable,
    isTimeUnavailable,
    addImage,
    removeImage,
    isAr,
  }
}
