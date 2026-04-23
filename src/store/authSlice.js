import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
        authChecked: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = {
                uid: action.payload.uid,
                email: action.payload.email,
                username: action.payload.username || null,
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
        updateUserData(state, action){
            state.user={
                ...state.user,
                ...action.payload
            }
        }
        
    }
});


export const { setUser, clearUser, setError, setAuthChecked, updateUserData } = authSlice.actions;
export default authSlice.reducer;