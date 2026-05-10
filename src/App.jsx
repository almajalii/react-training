import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Register from './screens/register/Register';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import BrowseServices from './screens/browse/BrowseServices';
import { clearUser, setUser, setAuthChecked } from './store/authSlice';
import { apiClient } from './api/apiClient';
import Profile from './screens/profile/Profile';

function App() {
  const { user, authChecked } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      dispatch(clearUser());
      dispatch(setAuthChecked(true));
      return;
    }

    if (user) {
      dispatch(setAuthChecked(true));
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await apiClient.profile.get();
        dispatch(setUser(userData));
      } catch (err) {
        console.error('Failed to fetch user:', err);
        localStorage.removeItem('authToken');
        dispatch(clearUser());
      } finally {
        dispatch(setAuthChecked(true));
      }
    };
    fetchUser();
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-page">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4" />
          <p className="text-muted">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseServices />} />
          <Route path="/browse/:categoryId" element={<BrowseServices />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;