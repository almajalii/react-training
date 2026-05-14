import AuthLayout from '../../components/organisms/AuthLayout';
import ProfileForm from '../../components/organisms/ProfileForm';
import { useProfile } from './useProfile';

export default function Profile() {
  const { formik, error, success, user } = useProfile();

  return (
    <AuthLayout>
      <ProfileForm formik={formik} error={error} success={success} user={user} />
    </AuthLayout>
  );
}
