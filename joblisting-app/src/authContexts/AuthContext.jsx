import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const isUserLoggedIn = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(
    isUserLoggedIn ? true : false
  );
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, initiliazeUser);
    return unSubscribe;
  }, []);
  const initiliazeUser = (user) => {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      localStorage.removeItem("user", JSON.stringify(user));
    }
  };
  const value = useMemo(
    () => ({
      currentUser,
      userLoggedIn,
      loading,
      user,
      setLoading,
    }),
    [currentUser, userLoggedIn, loading, user]
  );

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
function useAuth() {
  return useContext(AuthContext);
}
export default useAuth;
