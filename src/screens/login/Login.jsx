import AuthLayout from '../../components/organisms/AuthLayout';
import LoginForm from '../../components/organisms/LoginForm';
import { useLogin } from './useLogin';

export default function Login() {
  const { loginFormik } = useLogin();

  return (
    <AuthLayout>
      <LoginForm formik={loginFormik} />
    </AuthLayout>
  );
}
