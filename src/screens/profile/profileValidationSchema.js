import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{7,15}$/, 'Phone must be 7-15 digits, optionally starting with +')
    .optional(),
  dateOfBirth: Yup.string()
    .nullable()
    .optional(),
  gender: Yup.string()
    .oneOf(['Male', 'Female', ''], 'Gender must be Male or Female')
    .optional(),
});