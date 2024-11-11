import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  sessionUserInfo: [],
  setSessionUserInfo: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionUserInfo, setSessionUserInfo] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      if (user) {
        setSessionUserInfo([{ uid: user.uid, email: user.email }]);
      } else {
        setSessionUserInfo([]);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    sessionUserInfo,
    setSessionUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
