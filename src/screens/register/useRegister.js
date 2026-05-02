import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../../store/authSlice';
import { registerWithFirebase } from '../../firebase/authFunctions';
import { useTranslation } from 'react-i18next';

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
}

export function useRegister() {
        
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    const { error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);


    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !username || !password || !confirmPassword) {
            dispatch(setError(t('error_fields_required')));
            return;
        }
        if (password !== confirmPassword) {
            dispatch(setError(t('error_passwords_match')));
            return;
        }
        if (getPasswordStrength(password) < 3) {
            dispatch(setError(t('error_password_weak')));
            return;
        }
        if (username.length < 4) {
            dispatch(setError(t('error_username_short')));
            return;
        }
        if (!email.includes('@')) {
            dispatch(setError(t('error_invalid_email')));
            return;
        }

        setLoading(true);
        dispatch(setError(null));

        try {
            const firebaseUser = await registerWithFirebase(email, password, username, bio);
            dispatch(setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                username,
                bio,
            }));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            setLoading(false);
        }
    }

    return {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        bio, setBio,
        loading, error,
        handleSubmit,
    };
}