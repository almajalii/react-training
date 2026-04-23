import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/authSlice';
import { logoutFromFirebase } from '../firebase/authFunctions';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        await logoutFromFirebase();
        dispatch(clearUser());
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;