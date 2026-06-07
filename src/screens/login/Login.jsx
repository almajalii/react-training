import AuthLayout from '../../components/organisms/authLayout/AuthLayout';
import LoginForm from '../../components/organisms/forms/LoginForm';
import { useLogin } from './useLogin';

export default function Login() {
  const { loginFormik } = useLogin();

  return (
    <AuthLayout>
      <LoginForm formik={loginFormik} />
    </AuthLayout>
  );
}
