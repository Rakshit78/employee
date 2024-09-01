import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDoruf-QSonw1bO2WhTW8DAhjwpmt9Zlz0",
    authDomain: "trackig-f0a60.firebaseapp.com",
    projectId: "trackig-f0a60",
    storageBucket: "trackig-f0a60.appspot.com",
    messagingSenderId: "1043908350171",
    appId: "1:1043908350171:web:9264ed507c7dfaccd1bcfe",
    measurementId: "G-L4M3HJTN6S"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
