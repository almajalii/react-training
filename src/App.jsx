import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Register from './screens/register/Register';
import Login from './screens/login/Login';
import Welcome from './screens/welcome/Welcome';
import Profile from './screens/profile/Profile';
import { clearUser, setUser, setAuthChecked } from './store/authSlice';
import { getProfileFromFirebase } from './firebase/authFunctions';
import NavBar from './components/NavBar';
import { useTheme } from 'next-themes';
import LanguageSwitcher from './components/LanguageSwitcher';
function App() {
  const { theme } = useTheme();
  const { user, authChecked } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // onAuthStateChanged listens for changes in the user's authentication state
    // it returns an unsubscribe function that we can call to stop listening when the component unmounts
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Remove this:
      // 1. If a user is logged in, fetch their profile and update the Redux store
      if (firebaseUser) {
        try {
          // Fetch user profile from Firestore
          const profileData = await getProfileFromFirebase(firebaseUser.uid);

          dispatch(setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            username: profileData?.username || null,
            bio: profileData?.bio || null
          }));

        } catch (error) {
          console.error('Error fetching profile:', error);
          dispatch(clearUser());
        }
      } else {
        // 2. If no user is logged in, clear the user state in Redux
        dispatch(clearUser());
      }
      // Firebase has finished checking
      dispatch(setAuthChecked(true));
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  // Show loading screen while Firebase checks auth state
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
      <BrowserRouter>
        {/* NavBar only shows when user is logged in */}
        {user && <NavBar />}

        {/* Main content area */}
        <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
        <LanguageSwitcher />
      </BrowserRouter>
  );
}

export default App;