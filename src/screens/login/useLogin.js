import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../../store/authSlice';
import { apiClient } from '../../api/apiClient';
import { useFormik } from 'formik';
import { loginValidationSchema } from './loginValidation';
import { useTranslation } from 'react-i18next';

export function useLogin() {
  const { error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  // Login Form
  const loginFormik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      dispatch(setError(null));
      try {
        const response = await apiClient.auth.login(values.email, values.password);
        dispatch(setUser(response.data.user));
        navigate('/');
      } catch (err) {
        dispatch(setError(err.message || 'Login failed'));
      }
    },
  });

  return {
    loginFormik,
    error,
    t,
    isRTL,
  };
}