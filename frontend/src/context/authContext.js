import { getDownloadURL, ref } from "firebase/storage";
import React, { useState, createContext } from "react";
// import { getUserRecommend, login, signup } from "../api/web-api";
import { storage } from "../firebase";
export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  // const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [authToken, setAuthToken] = useState(existingToken);
  const [userProfile, setUserProfile] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  // const [recommendMovies, setRecommendMovies] = useState([]);

  //Function to put JWT token in local storage.
  // const setToken = (data) => {
  //   localStorage.setItem("token", data);
  //   // setAuthToken(data);
  // }

  // const authenticate = async (username, password) => {
  //   const result = await login(username, password);

  //   if (result.token) {
  //     // setToken(result.token)
  //     setIsAuthenticated(true);
  //     setUserName(username);
  //     // const r = await getUserRecommend(username)
  //     // setRecommendMovies(r);
  //   }
  //   return (result.success === true) ? true : false;
  // };

  // const register = async (username, password) => {
  //   const result = await signup(username, password);
  //   return (result.code === 201) ? true : false;
  // };
  const setUserAvatarFromFirebase = () => {
    const storageRef = ref(storage, 'avatars/' + userProfile.id + ".jpg")
    getDownloadURL(storageRef).then((url) => {
      setUserAvatar(url);
      console.log(url)
    }).catch((error) => {
      console.error(error);
    });
  }

  const signIn = (user) => {
    // setToken('');
    // setAuthToken("123123");
    // setTimeout(() => setIsAuthenticated(false), 100);
    localStorage.setItem('authToken', user.email);//以后可能换成token
    setIsAuthenticated(true);
    setUserAvatarFromFirebase()
    setUserProfile(user)

  }

  const signOut = () => {
    // setToken('');
    // setAuthToken("123123");
    // setTimeout(() => setIsAuthenticated(false), 100);
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        // authenticate,
        // register,
        signIn,
        signOut,
        // setRecommendMovies,
        userProfile,
        userAvatar,
        setUserAvatarFromFirebase
        // recommendMovies
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;