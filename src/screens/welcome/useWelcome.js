import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../store/authSlice';

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
