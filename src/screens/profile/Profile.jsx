import AuthLayout from '../../components/organisms/AuthLayout';
import ProfileForm from '../../components/organisms/ProfileForm';
import { useProfile } from './useProfile';

export default function Profile() {
  const { formik, success, user } = useProfile();

  return (
    <AuthLayout>
      <ProfileForm formik={formik} success={success} user={user} />
    </AuthLayout>
  );
}