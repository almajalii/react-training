import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, updateEmail, updatePhone, updateDob, updateGender } from '../../network/api';
import { updateUserData } from '../../store/authSlice';
import { profileValidationSchema } from './profileValidationSchema';

export function useProfile() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  // fetch profile data
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile().then((res) => res?.data ?? res),
    enabled: !!user, // only fetch if logged in
  });

  // update profile mutation
  const { mutate: saveProfile, isSuccess: success } = useMutation({
    mutationFn: async (values) => {
      const updates = [];
      if (values.email !== (user?.email || '')) updates.push(updateEmail(values.email));
      if (values.phone !== (user?.phone || '')) updates.push(updatePhone(values.phone));
      if (values.dateOfBirth !== (user?.dateOfBirth || ''))
        updates.push(updateDob(values.dateOfBirth));
      if (values.gender !== (user?.gender || '')) updates.push(updateGender(values.gender));
      if (updates.length > 0) await Promise.all(updates);
      return values;
    },
    onSuccess: (values) => {
      dispatch(updateUserData(values));
      toast.success(t('profile_updated'));
      queryClient.invalidateQueries({ queryKey: ['profile'] }); // refresh cache
    },
  });

  const formik = useFormik({
    enableReinitialize: true, // repopulates form when profileData loads
    initialValues: {
      email: profileData?.email || '',
      phone: profileData?.phone || '',
      dateOfBirth: profileData?.dateOfBirth || '',
      gender: profileData?.gender || '',
    },
    validationSchema: profileValidationSchema(t),
    onSubmit: (values) => saveProfile(values),
  });

  return { formik, success, user };
}
