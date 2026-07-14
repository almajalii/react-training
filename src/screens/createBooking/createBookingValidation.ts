import * as Yup from 'yup'
import { TFunction } from 'i18next'
//step 1 schema services +description
export const step1Schema = (t: TFunction) =>
  Yup.object({
    serviceName: Yup.string().required(t('booking_val_service_required')),
    description: Yup.string().min(6, t('booking_val_description_min')).required(t('booking_val_description_required')),
  })

//step 2 schema date + time
export const step2Schema = (t: TFunction) =>
  Yup.object({
    scheduledDate: Yup.string().required(t('booking_val_date_required')),
    scheduledTime: Yup.string().required(t('booking_val_time_required')),
    address: Yup.string().min(3, t('booking_val_address_min')).required(t('booking_val_address_required')),
  })
