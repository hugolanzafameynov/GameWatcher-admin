import {initializeApp} from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyAUEAI12AJAvcb1gY4zLR7Ant-unI8ispY',
    authDomain: 'game-watcher-d5d86.firebaseapp.com',
    databaseURL: 'databaseURL: https://game-watcher-d5d86-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'game-watcher-d5d86',
    storageBucket: 'game-watcher-d5d86.appspot.com',
    messagingSenderId: '449302906366',
    appId: '449302906366:web:e27ffd4b6cde431ca96caf',
    measurementId: 'G-WSSC8PQ360',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
