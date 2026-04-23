import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../store/authSlice';
import { loginWithFirebase } from '../firebase/authFunctions';

function Login() {
    // form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // redux state=> error
    const { error } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    async function handleSubmit(e) {

        e.preventDefault();
        setLoading(true);
        dispatch(setError(null));

        try {
            const userData = await loginWithFirebase(email, password);
            dispatch(setUser({
                uid: userData.uid,
                email: userData.email,
                username: userData.username,
                bio: userData.bio,
            }));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading || !email || !password}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <p>Don't have an account? <a href="/register">Register here</a></p>
                </div>
            </form>
        </>
    )
}

export default Login;