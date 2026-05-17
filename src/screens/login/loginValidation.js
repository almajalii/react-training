import * as Yup from 'yup';

export const loginValidationSchema = (t) => Yup.object({
  email: Yup.string()
    .email(t('val_email_invalid'))
    .required(t('val_email_required')),
  password: Yup.string()
    .min(8, t('val_password_min'))
    .required(t('val_password_required')),
});