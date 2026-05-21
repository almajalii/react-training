import * as Yup from 'yup';

export const profileValidationSchema = (t) =>
  Yup.object({
    email: Yup.string().email(t('val_email_invalid')).required(t('val_email_required')),
    phone: Yup.string()
      .matches(/^\+?[0-9]{7,15}$/, t('val_phone_invalid_profile'))
      .optional(),
    dateOfBirth: Yup.string().nullable().optional(),
    gender: Yup.string().oneOf(['Male', 'Female', ''], t('val_gender_invalid')).optional(),
  });
