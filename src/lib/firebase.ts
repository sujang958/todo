import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { user } from "$lib/stores"

const firebaseConfig = {
  apiKey: "AIzaSyDehnvDxrVRb2uoayD35zDHbA384SYqTJQ",
  authDomain: "schat-with-me.firebaseapp.com",
  projectId: "schat-with-me",
  storageBucket: "schat-with-me.appspot.com",
  messagingSenderId: "729862355333",
  appId: "1:729862355333:web:a5394ebddf2da6ed7dacec",
  measurementId: "G-HXK471N9V1",
}

initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider()
provider.addScope("https://www.googleapis.com/auth/userinfo.email")

export const auth = getAuth()

export const db = getFirestore()

auth.onAuthStateChanged((changed) => {
  if (!changed) return
  user.update((prev) => ({ ...prev, signedIn: true, currentUser: changed }))
})
