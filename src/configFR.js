import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAyQcTW4FthtML_Q0Sr14QWsar6Ljpa6zg",
  authDomain: "ites-hackers.firebaseapp.com",
  projectId: "ites-hackers",
  storageBucket: "ites-hackers.appspot.com",
  messagingSenderId: "1040630275250",
  appId: "1:1040630275250:web:2cfedb85877ef37c51bdab"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)