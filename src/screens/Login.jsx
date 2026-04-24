import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../store/authSlice';
import { loginWithFirebase } from '../firebase/authFunctions';
import { resetPasswordInFirebase } from '../firebase/authFunctions';
import { Link } from 'react-router-dom';

function Login() {
    // form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    // reset password state
    const [resetEmail, setResetEmail] = useState('');
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    
    // which section to show
    const [section, setSection] = useState('login');
    
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

    async function handleResetSubmit(e) {
        e.preventDefault();
        setResetLoading(true);
        dispatch(setError(null));
        setResetSuccess(false);

        try {
            await resetPasswordInFirebase(resetEmail);
            setResetSuccess(true);
            setResetEmail('');
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            setResetLoading(false);
        }
    }

    return (
        <>
            <div className="screen">
                <div className="card">
                    {section === 'login' && (
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
                                {error && <p className="error">{error}</p>}
                                <div>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setSection('forgot-password');
                                            dispatch(setError(null));
                                            setResetSuccess(false);
                                        }}
                                        className="link"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a90e2', textDecoration: 'underline' }}
                                    >
                                        Forgot password?
                                    </button>
                                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                                </div>
                            </form>
                        </>
                    )}

                    {section === 'forgot-password' && (
                        <>
                            <div className="avatar">🔑</div>
                            <h1>Reset Password</h1>
                            <p>Enter your email and we'll send you a reset link.</p>

                            {resetSuccess ? (
                                <>
                                    <p className="success">
                                        Reset email sent! Check your inbox.
                                    </p>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setSection('login');
                                            setResetSuccess(false);
                                        }}
                                        className="link"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a90e2', textDecoration: 'underline' }}
                                    >
                                        Back to Login
                                    </button>
                                </>
                            ) : (
                                <form onSubmit={handleResetSubmit}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        required
                                    />
                                    <button type="submit" disabled={resetLoading || !resetEmail}>
                                        {resetLoading ? 'Sending...' : 'Send Reset Email'}
                                    </button>
                                    {error && <p className="error">{error}</p>}
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setSection('login');
                                            dispatch(setError(null));
                                        }}
                                        className="link"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a90e2', textDecoration: 'underline' }}
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Login;