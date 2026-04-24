import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Register from './screens/Register';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Profile from './screens/Profile';
import { clearUser, setUser, setAuthChecked } from './store/authSlice';
import { getProfileFromFirebase } from './firebase/authFunctions';
import NavBar from './components/NavBar';
function App() {
  const { user, authChecked } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

 useEffect(() => {
    //onAuthStateChanged listens for changes in the user's authentication state
    //it returns an unsubscribe function that we can call to stop listening when the component unmounts
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // 1 If a user is logged in, fetch their profile and update the Redux store
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
        //2 If no user is logged in, clear the user state in Redux
      } else {
        dispatch(clearUser());
      }
      // firebase has finished checking
      dispatch(setAuthChecked(true));
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  }, [dispatch]);

/* 
authChecked: false, user: null   →  still loading, don't show anything yet
authChecked: true,  user: null   →  Firebase checked, nobody logged in → show login
authChecked: true,  user: {...}  →  Firebase checked, Sara is logged in → show app
authChecked: false, user: {...}  →  impossible, shouldn't happen 
*/
  if (!authChecked) return <h1>Loading...</h1>;

  return (
    <BrowserRouter>
    {user && <NavBar />} {/* Show NavBar only if user is logged in */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
 </Routes>
    </BrowserRouter>
  );
}

export default App;