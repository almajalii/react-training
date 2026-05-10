import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authReducer from './authSlice';

const storage = {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    blacklist: ['error', 'authChecked'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);//responsible for rehydrating (loading back) the saved state when the app starts up.
/* 
{
  auth: {
    user: null | {
      uid: string,      // Firebase unique ID
      email: string,    // Email address
      username: string, // Display name
      bio: string       // User bio
    },
    error: null | string,  // Error message or null
    authChecked: boolean   // Has Firebase finished checking?
     }
} 
*/
