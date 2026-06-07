import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../network/api';
import { setUser } from '../../store/authSlice';
import { loginValidationSchema } from './loginValidation';

export function useLogin() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const loginFormik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema(t),
    onSubmit: async (values) => {
      try {
        const response = await login(values.email, values.password);
        dispatch(setUser(response.data.user));
        toast.success(t('login_success'));
        navigate('/');
      } catch {
        // error toast fired automatically by responseInterceptor
      }
    },
  });

  return { loginFormik, t, isRTL };
}
