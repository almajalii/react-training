import AuthLayout from '../../components/organisms/authLayout/AuthLayout';
import ProfileForm from '../../components/organisms/forms/ProfileForm';
import { useProfile } from './useProfile';

export default function Profile() {
  const { formik, success, user } = useProfile();

  return (
    <AuthLayout>
      <ProfileForm formik={formik} success={success} user={user} />
    </AuthLayout>
  );
}
