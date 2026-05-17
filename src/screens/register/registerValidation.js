import * as Yup from 'yup';

export const registerValidationSchema = (t) => Yup.object({
  firstName: Yup.string()
    .min(2, t('val_firstName_min'))
    .required(t('val_firstName_required')),
  lastName: Yup.string()
    .min(2, t('val_lastName_min'))
    .required(t('val_lastName_required')),
  email: Yup.string()
    .email(t('val_email_invalid'))
    .required(t('val_email_required')),
  phone: Yup.string()
    .matches(/^[0-9]{7,15}$/, t('val_phone_invalid'))
    .optional(),
  password: Yup.string()
    .min(8, t('val_password_min'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      t('val_password_weak')
    )
    .required(t('val_password_required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], t('val_confirmPassword_match'))
    .required(t('val_confirmPassword_required')),
});