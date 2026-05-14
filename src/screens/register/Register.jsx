import AuthLayout from '../../components/organisms/AuthLayout';
import RegisterForm from '../../components/organisms/RegisterForm';
import { useRegister } from './useRegister';

export default function Register() {
  const { formik, error } = useRegister();

  return (
    <AuthLayout>
      <RegisterForm formik={formik} error={error} />
    </AuthLayout>
  );
}
