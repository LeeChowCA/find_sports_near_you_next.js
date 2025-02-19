// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxtdGk27BgylZTLGMyQqDCXcuX9HkTJu4",
    authDomain: "ninja-4b410.firebaseapp.com",
    projectId: "ninja-4b410",
    storageBucket: "ninja-4b410.firebasestorage.app",
    messagingSenderId: "314248408033",
    appId: "1:314248408033:web:2cee05b2cbc0c4e291c0a0",
    measurementId: "G-4Z6DC5ND3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;