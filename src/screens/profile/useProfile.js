import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { apiClient } from '../../api/apiClient';
import { updateUserData } from '../../store/authSlice';
import { profileValidationSchema } from './profileValidationSchema';

export function useProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      setError(null);
      setSuccess(false);

      try {
        const updates = [];

        // Only call API for fields that changed
        if (values.email !== (user?.email || '')) {
          updates.push(apiClient.profile.updateEmail(values.email));
        }
        if (values.phone !== (user?.phone || '')) {
          updates.push(apiClient.profile.updatePhone(values.phone));
        }
        if (values.dateOfBirth !== (user?.dateOfBirth || '')) {
          updates.push(apiClient.profile.updateDob(values.dateOfBirth));
        }
        if (values.gender !== (user?.gender || '')) {
          updates.push(apiClient.profile.updateGender(values.gender));
        }

        // Execute all updates in parallel
        if (updates.length > 0) {
          await Promise.all(updates);
        }

        // Update Redux store
        dispatch(updateUserData(values));
        setSuccess(true);

        // Auto-dismiss success message after 2 seconds
        setTimeout(() => setSuccess(false), 2000);
      } catch (err) {
        setError(err.message || 'Error updating profile');
      }
    },
  });

  // Fetch profile data on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await apiClient.profile.get();
        formik.setValues({
          email: profile.email || '',
          phone: profile.phone || '',
          dateOfBirth: profile.dateOfBirth || '',
          gender: profile.gender || '',
        });
      } catch (err) {
        setError('Error loading profile');
      }
    }
    if (user) loadProfile();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    formik,
    error,
    success,
    user,
  };
}
