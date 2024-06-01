import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential;
  return user;
};
export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  return user;
};
export const signOutUser = async () => {
  await signOut(auth);
};
export const resetPassword = async (email) => {
  if (email) {
    await sendPasswordResetEmail(auth, email);
    toast("Password reset email sent!");
  } else {
    toast.error("Please enter your email");
  }
};
