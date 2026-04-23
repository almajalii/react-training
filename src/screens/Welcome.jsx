import { useSelector, useDispatch } from "react-redux";
import { clearUser, setError } from "../store/authSlice";
import { useState } from "react";

function Welcome() {

  const [loading, setLoading] = useState(false);

  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

 

  return <>
    <h1>Welcome</h1>
    {user ? (
      <>
        <p>Welcome back, {user.username}!</p>
        <a href="/profile">profile</a>
        
      </>

    ) : (
      <>
        <p>Please log in to access your account.</p>
        <a href="/login">Go to Login</a>
      </>
    )}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {console.log(user)}
  </>
}
export default Welcome;