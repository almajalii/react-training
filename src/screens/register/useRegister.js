import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setError } from '../../store/authSlice';
import { apiClient } from '../../api/apiClient';
import { useFormik } from 'formik';
import { registerValidationSchema } from './registerValidation';
import { useTranslation } from 'react-i18next';
import { labelClass, inputClass } from '../../styles/formStyle';

export function useRegister() {
  const { error } = useSelector(state => state.auth);
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
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      dispatch(setError(null));
      try {
        const response = await apiClient.auth.register(
          values.firstName,
          values.lastName,
          values.email,
          values.phone,
          values.password,
          values.confirmPassword,
          'customer'
        );
        
        // Response structure: { data: { token, user: UserDto } }
        dispatch(setUser(response.data.user));
        navigate('/');
      } catch (err) {
        dispatch(setError(err.message || 'Registration failed'));
      }
    },
  });

  return {
    formik,
    error,
    labelClass,
    inputClass,
    isRTL,
    t,
  };
}