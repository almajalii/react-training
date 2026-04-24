import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Welcome() {

  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return <>
    <div className="screen">
      <div className="card">

        {user ? (
          <>
            <h3>Welcome back, {user.username}!</h3>
          </>

        ) : (
          <>
            <h1>Welcome</h1>
            <p>Please log in to access your account.</p>
            <Link to="/login">Go to Login</Link>
          </>
        )}
        {error && <p className="error">{error}</p>}
        {/* remove */}
        {console.log(user)}
      </div>
    </div>
  </>
}
export default Welcome;