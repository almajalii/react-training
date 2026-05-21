import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setError } from '../../store/authSlice';
import { useTranslation } from 'react-i18next';

export function useWelcome() {
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);

  return { user, error, t };
}
