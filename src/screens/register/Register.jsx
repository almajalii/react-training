import AuthLayout from '../../components/organisms/authLayout/AuthLayout';
import RegisterForm from '../../components/organisms/forms/RegisterForm';
import { useRegister } from './useRegister';

export default function Register() {
  const { formik } = useRegister();

  return (
    <AuthLayout>
      <RegisterForm formik={formik} />
    </AuthLayout>
  );
}
