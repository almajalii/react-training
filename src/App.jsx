import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearUser, setAuthChecked } from './store/authSlice';
import Register from './screens/register/Register';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import BrowseServices from './screens/browse/BrowseServices';
import Profile from './screens/profile/Profile';
import ProfessionalProfile from './screens/professionalProfile/ProfessionalProfile';
import CreateBooking from './screens/createBooking/CreateBooking';
import MyAddresses from './screens/myAddresses/MyAddresses';
function App() {
  const { user, authChecked } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    // No token — clear any stale user data and mark auth as checked
    if (!token) {
      dispatch(clearUser());
    }
    dispatch(setAuthChecked(true));
  }, [dispatch]);

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
          <Route path="/pro/:id" element={<ProfessionalProfile />} />
          <Route
            path="/book/:id"
            element={user ? <CreateBooking /> : <Navigate to="/login" replace />}
          />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
          <Route
            path="/my-addresses"
            element={user ? <MyAddresses /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
