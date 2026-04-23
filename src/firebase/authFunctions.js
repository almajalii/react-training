import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Register a new user
export const registerWithFirebase = async (email, password, name, bio) => {
    try {
        //1 create user in firebase auth
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        //2 create a document for user in firestore
        await setDoc(doc(db, 'users', userCred.user.uid), {
            username: name,
            email,
            bio: bio || '',
            createdAt: Date.now(),
        });
        return userCred.user;
    } catch (error) {
        console.error('Registration failed:', error.message);
        throw error;
    }
};

// Login existing user
export const loginWithFirebase = async (email, password) => {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        //Fetch user profile from Firestore
        const docSnap = await getDoc(doc(db, 'users', userCred.user.uid));
        // If user document exists, return profile data along with auth data
        const profileData = docSnap.exists() ? docSnap.data() : {};
          
        return {
            uid: userCred.user.uid,
            email: userCred.user.email,
            ...profileData //added from firestore
        }
    } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
    }
};

// Logout
export const logoutFromFirebase = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout failed:', error.message);
        throw error;
    }
};

// Get profile from Firestore
export const getProfileFromFirebase = async (uid) => {
    try {
        const docSnap = await getDoc(doc(db, 'users', uid));
        if (docSnap.exists()) return docSnap.data();
        return {}; // Return empty object instead of null
    } catch (error) {
        console.error('Failed to fetch profile:', error.message);
        throw error;
    }
};

export const updateProfileInFirebase = async (uid, updates) => {
    try {
        await updateDoc(doc(db, 'users', uid), updates);
    } catch (error) {
        console.error('Update failed:', error.message);
        throw error;
    }
};