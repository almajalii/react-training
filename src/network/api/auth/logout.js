import { setToken } from '../../http/tokenHelper';

const logout = () => setToken(null);

export default logout;
