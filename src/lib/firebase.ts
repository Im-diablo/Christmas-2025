import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Public demo Firebase config - for production, use your own Firebase project
const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyForChristmasTree123456789",
    authDomain: "christmas-tree-demo.firebaseapp.com",
    databaseURL: "https://christmas-tree-demo-default-rtdb.firebaseio.com",
    projectId: "christmas-tree-demo",
    storageBucket: "christmas-tree-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
