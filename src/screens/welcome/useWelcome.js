import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setError } from '../../store/authSlice';

export function useWelcome() {
    const { user, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return { user, error };
}