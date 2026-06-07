import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../network/api';
import { setUser } from '../../store/authSlice';
import { registerValidationSchema } from './registerValidation';

export function useRegister() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerValidationSchema(t),
    onSubmit: async (values) => {
      try {
        const response = await register(
          values.firstName,
          values.lastName,
          values.email,
          values.phone,
          values.password,
          values.confirmPassword,
          'customer'
        );
        dispatch(setUser(response.data.user));
        toast.success(t('register_success'));
        navigate('/');
      } catch {
        // error toast fired automatically by responseInterceptor
      }
    },
  });

  return { formik, isRTL, t };
}
