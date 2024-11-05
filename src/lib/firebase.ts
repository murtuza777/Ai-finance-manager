import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCJpIiCly9Eqf2sbO7_dc0pkwRw9bAHLqY",
    authDomain: "aifm-8c893.firebaseapp.com",
    projectId: "aifm-8c893",
    storageBucket: "aifm-8c893.appspot.com",
    messagingSenderId: "431528089067",
    appId: "1:431528089067:web:e97c20706028791781f5ae"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const storage = getStorage(app);