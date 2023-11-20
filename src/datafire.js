import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBiD7pxW7RH3x9vkOK5RbeZPWPoNVKcEOM",
  authDomain: "iot-hand-door.firebaseapp.com",
  databaseURL:
    "https://iot-hand-door-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-hand-door",
  storageBucket: "iot-hand-door.appspot.com",
  messagingSenderId: "872355265884",
  appId: "1:872355265884:web:6e54a7c23dbf5045791599",
  measurementId: "G-N44340GVWJ",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = getDatabase(app);
