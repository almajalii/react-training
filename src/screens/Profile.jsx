import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import{ updateUserData, setError, clearUser } from "../store/authSlice";
import {updateProfileInFirebase, logoutFromFirebase} from "../firebase/authFunctions";

function Profile(){
    const {user, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    //Form state
    const [username, setUsername] = useState(user? user.username : "");
    const [bio, setBio] = useState(user? user.bio : "");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function HandleSubmit(e){
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
        <h1>Profile</h1>
        <p>Email: {user?.email}</p>
        <form onSubmit={HandleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save changes'}
                </button>

                {success && <p style={{ color: 'green' }}>Profile updated!</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
    </>
    )
}
export default Profile;