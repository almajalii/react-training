import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,         //current user object or null
        error: null,        //error mssg or null
        authChecked: false, //firebase auth status checked or not
    },
    reducers: {
        //payload: {uid, email, username, bio?}
        setUser(state, action) {
            state.user = {
                uid: action.payload.uid,
                email: action.payload.email,
                username: action.payload.username,
                bio: action.payload.bio || null,
            };
            state.error = null;
        },
        clearUser(state) {
            state.user = null;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setAuthChecked(state, action) {
            state.authChecked = action.payload;
        },
        //payload : {bio: "xxx"}
        updateUserData(state, action) {
            state.user = {
                ...state.user, ...action.payload
            }
        }
    }
});

export const { setUser, clearUser, setError, setAuthChecked, updateUserData } = authSlice.actions;
export default authSlice.reducer;