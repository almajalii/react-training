import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../store/authSlice';
import { registerWithFirebase } from '../firebase/authFunctions';
import { Link } from 'react-router-dom';

export default function Register() {
    // Form state
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Redux state
    const { error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();

        //  Basic validation
        if (!email || !username || !password || !confirmPassword) {
            dispatch(setError('All fields are required'));
            return;
        }

        if (password !== confirmPassword) {
            dispatch(setError('Passwords do not match'));
            return;
        }

        if (password.length < 6) {
            dispatch(setError('Password must be at least 6 characters'));
            return;
        }

        if (username.length < 3) {
            dispatch(setError('Username must be at least 3 characters'));
            return;
        }

        if (!email.includes('@')) {
            dispatch(setError('Invalid email'));
            return;
        }

        setLoading(true);
        dispatch(setError(null));

        try {
            const FirebaseUser = await registerWithFirebase(email, password, username, bio);

            dispatch(setUser({
                uid: FirebaseUser.uid,
                email: FirebaseUser.email,
                username: username,
                bio: bio
            }));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="screen">
                <div className="card">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Username (min 3 chars)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password (min 6 chars)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Bio (optional)"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <button type="submit" disabled={loading || !email || !username || !password || !confirmPassword}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>

                        <div>
                            <p>Already have an account? <Link to="/login">Login here</Link></p>
                        </div>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}