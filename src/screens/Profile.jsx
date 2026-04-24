import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData, setError, clearUser } from "../store/authSlice";
import { updateProfileInFirebase, logoutFromFirebase } from "../firebase/authFunctions";

function Profile() {
    const { user, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Form state
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // SYNC form with Redux when user changes
    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setBio(user.bio || "");
        }
    }, [user]); // Re-run when user changes

    async function HandleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        dispatch(setError(null));
        try {
            await updateProfileInFirebase(user.uid, { username, bio });
            dispatch(updateUserData({ username, bio }));
            setSuccess(true);
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="screen">
                <div className="card">
                    <h1>Profile</h1>
                    <p>Email: {user?.email}</p>
                    <form onSubmit={HandleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setSuccess(false);
                            }}
                        />
                        <textarea 
                            placeholder="Bio" 
                            value={bio} 
                            onChange={(e) => { 
                                setBio(e.target.value); 
                                setSuccess(false); 
                            }} 
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>

                        {success && <p className="success">Profile updated!</p>}
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}
export default Profile;