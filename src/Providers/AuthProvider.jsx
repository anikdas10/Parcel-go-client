import { auth } from "@/Firebase/firebase.config";
import UseAxiosPublic from "@/Hooks/useAxiosPublic";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const axiosPublic = UseAxiosPublic();
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // update user
  const updateUser = (name,imageUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: name ,photoURL:imageUrl});
  };
  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // google login
  const handleGoogleLogin = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  // authState changed

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    //   if (currentUser) {
    //     const userinfo = { email: currentUser.email };
    //     const result = await axiosPublic.post("/jwt", userinfo);
    //     console.log(result);
    //     if (result.data.token) {
    //       localStorage.setItem("access-token", result.data.token);
    //     }
    //   } else {
    //     localStorage.removeItem("access-token");
    //   }
      console.log(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    logOut,
    updateUser,
    handleGoogleLogin,
  };
 
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;