// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdMhyrt6vyY9Enz7Kb-WeNzNi3YlTZdxw",
    authDomain: "login-auth-6443a.firebaseapp.com",
    projectId: "login-auth-6443a",
    storageBucket: "login-auth-6443a.appspot.com",
    messagingSenderId: "601531476586",
    appId: "1:601531476586:web:5b3522b84ea5107e8a3813",
    measurementId: "G-1BZXR2FC4L"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth= getAuth();
// const analytics = getAnalytics(app);

// export {app ,auth};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: "",
//     measurementId: "",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
