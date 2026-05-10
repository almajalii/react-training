import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../../store/authSlice';
import { registerWithFirebase } from '../../firebase/authFunctions';
import { useTranslation } from 'react-i18next';  
import { labelClass, inputClass } from '../../styles/formStyle';

export function useRegister() {
    // Form state
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    // Redux
    const { error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Translation & styling
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    // Form submit logic
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

        if (password.length < 8) {
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

    //  Return styles too
    return {
        // Form state
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        bio, setBio,
        loading, error,
        handleSubmit,
        labelClass,
        inputClass,
        isRTL,
        t,
        i18n,
    };
}