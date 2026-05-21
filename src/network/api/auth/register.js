import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { setToken } from '../../http/tokenHelper';
import { HttpMethod, Role } from '../../config/apiConstants';

const register = async (
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword,
  role = Role.CUSTOMER
) => {
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/auth/register`, {
      method: HttpMethod.POST,
      headers: buildHeaders(false),
      body: JSON.stringify({ firstName, lastName, email, phone, password, confirmPassword, role }),
    })
  );

  const token = res?.data?.token;
  if (token) setToken(token);

  return res;
};

export default register;
