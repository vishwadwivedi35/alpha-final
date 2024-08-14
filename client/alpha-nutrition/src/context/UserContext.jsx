// import { createContext, useState, useEffect } from "react";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "../utils/firebase/firebase.utils";

// export const UserContext = createContext({
//   setCurrentUser: () => null,
//   currentUser: null,
// });

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const value = { currentUser, setCurrentUser };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener(async (user) => {
//       if (user) {
//         const userDoc = await createUserDocumentFromAuth(user);
//         const userSnapshot = await userDoc.get();
//         const userData = userSnapshot.data();

//         setCurrentUser({
//           ...user,
//           isAdmin: userData.isAdmin, // Assuming you have an 'isAdmin' field in your user document
//         });
//       } else {
//         setCurrentUser(user);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// import { createContext, useState, useEffect } from "react";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "../utils/firebase/firebase.utils";
// import { getDoc } from "firebase/firestore";

// export const UserContext = createContext({
//   setCurrentUser: () => null,
//   currentUser: null,
//   temporaryUserCredentials: [],
//   setTemporaryUserCredentials: () => null,
// });

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [temporaryUserCredentials, setTemporaryUserCredentials] = useState([]); // Array to store user credentials

//   const value = {
//     currentUser,
//     setCurrentUser,
//     temporaryUserCredentials,
//     setTemporaryUserCredentials,
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener(async (user) => {
//       if (user) {
//         const userDocRef = await createUserDocumentFromAuth(user);
//         const userSnapshot = await getDoc(userDocRef);
//         const userData = userSnapshot.data();

//         const userCredentials = {
//           uid: user.uid,
//           displayName: user.displayName,
//           email: user.email,
//           isAdmin: userData?.isAdmin, // Assuming you have an 'isAdmin' field in your user document
//         };

//         setCurrentUser(userCredentials);

//         // Add user credentials to temporary storage
//         setTemporaryUserCredentials((prevCredentials) => [
//           ...prevCredentials,
//           userCredentials,
//         ]);
//       } else {
//         setCurrentUser(user);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

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
