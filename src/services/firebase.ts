import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "betpredictor-demo.firebaseapp.com",
  projectId: "betpredictor-demo",
  storageBucket: "betpredictor-demo.appspot.com",
  messagingSenderId: "581326886241",
  appId: "1:581326886241:web:cc8c1c49c0f7c3db1a24c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(
      error.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : 'Failed to login. Please try again.'
    );
  }
};

export const registerUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Registration error:", error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already in use. Please try logging in instead.');
    }
    throw new Error('Failed to create account. Please try again.');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout error:", error);
    throw new Error('Failed to log out. Please try again.');
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};