import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase configuration
 * 
 * This configuration is loaded from environment variables defined in the .env file.
 * The || "your-api-key" pattern provides fallback values for development purposes,
 * but you should always use proper environment variables in production.
 * 
 * To set up:
 * 1. Copy .env.example to .env
 * 2. Replace the placeholder values with your actual Firebase project credentials
 * 3. Make sure .env is in your .gitignore to avoid exposing sensitive information
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-storage-bucket.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase application
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Initialize Firebase storage
const storage = getStorage(app);

export { app, db, storage }; 