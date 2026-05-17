import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getProfile, updateEmail, updatePhone, updateDob, updateGender } from '../../network/api';
import { updateUserData } from '../../store/authSlice';
import { profileValidationSchema } from './profileValidationSchema';

export function useProfile() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
    },
    validationSchema: profileValidationSchema(t),
    onSubmit: async (values) => {
      setSuccess(false);
      try {
        const updates = [];

        if (values.email !== (user?.email || '')) updates.push(updateEmail(values.email));
        if (values.phone !== (user?.phone || '')) updates.push(updatePhone(values.phone));
        if (values.dateOfBirth !== (user?.dateOfBirth || '')) updates.push(updateDob(values.dateOfBirth));
        if (values.gender !== (user?.gender || '')) updates.push(updateGender(values.gender));

        if (updates.length > 0) {
          await Promise.all(updates);
        }

        dispatch(updateUserData(values));
        toast.success(t('profile_updated'));
        setSuccess(true);

        setTimeout(() => setSuccess(false), 2000);
      } catch {
        // error toast fired automatically by responseInterceptor
      }
    },
  });

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const res = await getProfile();
        const profile = res?.data ?? res;
        if (!cancelled) {
          formik.resetForm({
            values: {
              email: profile.email || '',
              phone: profile.phone || '',
              dateOfBirth: profile.dateOfBirth || '',
              gender: profile.gender || '',
            },
          });
        }
      } catch {
        // error toast fired automatically by responseInterceptor
      }
    }

    if (user) loadProfile();
    return () => { cancelled = true; };
  }, [user]); // formik intentionally omitted — resetForm is stable and won't cause re-renders

  return { formik, success, user };
}