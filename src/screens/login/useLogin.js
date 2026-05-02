import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setError } from '../../store/authSlice';
import { loginWithFirebase, resetPasswordInFirebase } from '../../firebase/authFunctions';

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [resetEmail, setResetEmail] = useState('');
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const [section, setSection] = useState('login');

    const { error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);



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

    function goToForgotPassword() {
        setSection('forgot-password');
        dispatch(setError(null));
        setResetSuccess(false);
    }

    function goToLogin() {
        setSection('login');
        dispatch(setError(null));
        setResetSuccess(false);
    }

    return {
        // login form
        email, setEmail,
        password, setPassword,
        loading, handleSubmit,
        // reset form
        resetEmail, setResetEmail,
        resetLoading, resetSuccess,
        handleResetSubmit,
        // navigation
        section, goToForgotPassword, goToLogin,
        // shared
        error
    };
}