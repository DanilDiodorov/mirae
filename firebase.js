import { initializeApp } from "firebase/app"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBblTlIZy3Q3qZOLNaHXwYxcpY0j7z_Ovs",
  authDomain: "mirae-603d6.firebaseapp.com",
  projectId: "mirae-603d6",
  storageBucket: "mirae-603d6.appspot.com",
  messagingSenderId: "794782128281",
  appId: "1:794782128281:web:6b807cd308dcad3d7e0008"
}

const app = initializeApp(firebaseConfig, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})