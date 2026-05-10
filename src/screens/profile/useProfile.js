import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData, setError } from "../../store/authSlice";
import { updateProfileInFirebase } from "../../firebase/authFunctions";
import { useTranslation } from 'react-i18next';
import { labelClass, inputClass } from '../../styles/formStyle';

export function useProfile() {
    const { user, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [username, setUsernameState] = useState("");
    const [bio, setBioState] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    useEffect(() => {

        dispatch(setError(null));

        if (user) {
            setUsernameState(user.username || "");
            setBioState(user.bio || "");
        }
    }, [user]);

    function handleUsernameChange(value) {
        setUsernameState(value);
        setSuccess(false);
    }

    function handleBioChange(value) {
        setBioState(value);
        setSuccess(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        dispatch(setError(null));
        try {
            await updateProfileInFirebase(user.uid, { username, bio });
            dispatch(updateUserData({ username, bio }));
            setSuccess(true);
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            setLoading(false);
        }
    }

    return {
        user, error,
        username, handleUsernameChange,
        bio, handleBioChange,
        loading, success,
        handleSubmit,t,isRTL,labelClass,inputClass
    };
}