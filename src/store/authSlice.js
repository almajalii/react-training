import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    authChecked: false,
    loading: false,
  },
  reducers: {
    // Payload: Backend UserDto
    // {
    //   id, firstName, lastName, email, phone, role,
    //   isVerified, profileImageUrl, dateOfBirth, gender, createdAt
    // }
    setUser(state, action) {
      state.user = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone || null,
        role: action.payload.role || 'customer',
        isVerified: action.payload.isVerified || false,
        profileImageUrl: action.payload.profileImageUrl || null,
        dateOfBirth: action.payload.dateOfBirth || null,
        gender: action.payload.gender || null,
        createdAt: action.payload.createdAt || null,
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

    setLoading(state, action) {
      state.loading = action.payload;
    },

    // Update specific user fields
    // payload: { firstName: "John", phone: "+971..." }
    updateUserData(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    // Update profile picture
    // payload: { profileImageUrl: "https://..." }
    updateProfileImage(state, action) {
      if (state.user) {
        state.user.profileImageUrl = action.payload.profileImageUrl;
      }
    },

    // Mark email as verified
    verifyEmail(state) {
      if (state.user) {
        state.user.isVerified = true;
      }
    },
  },
});

export const {
  setUser,
  clearUser,
  setError,
  setAuthChecked,
  setLoading,
  updateUserData,
  updateProfileImage,
  verifyEmail,
} = authSlice.actions;

export default authSlice.reducer;
