import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../store/authSlice';
import { registerWithFirebase } from '../firebase/authFunctions';

export default function Register() {
    // Form state
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);
    // Redux state =>error 
    const { error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        //password validation
        if (password !== confirmPassword) {
            dispatch(setError("Passwords do not match"));
            return;
        }
        if (password.length < 6) {
            dispatch(setError("Password must be at least 6 characters"));
            return;
        }

        e.preventDefault();
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
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
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
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button type="submit" disabled={loading || !email || !username || !password || !confirmPassword}>
                    {loading ? 'Registering...' : 'Register'}
                </button>

                <div>
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </>
    )
}