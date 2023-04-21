import { getDownloadURL, ref } from "firebase/storage";
import React, { useState, createContext } from "react";
// import { getUserRecommend, login, signup } from "../api/web-api";
import { storage } from "../firebase";
import favouriteService from "../api/favouriteService";
import { currentTime } from "../util";
import userService from "../api/userService";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(props.initialUserProfile ? true : false);
  console.log(props)
  const [userProfile, setUserProfile] = useState(props.initialUserProfile ? props.initialUserProfile : {});
  const [userAvatar, setUserAvatar] = useState(props.initialUserAvatar ? props.initialUserAvatar : "");
  const [favouriteList, setFavouriteList] = useState(props.initialUserFavourite ? props.initialUserFavourite : []);

  const setUserAvatarFromFirebase = (id, rm) => {
    const storageRef = ref(storage, "avatars/" + id + ".jpg")
    getDownloadURL(storageRef).then((url) => {
      setUserAvatar(url);
      console.log(url)
      if (rm) {
        localStorage.setItem("userAvatar", JSON.stringify(url));
      }
      else {
        sessionStorage.setItem("userAvatar", JSON.stringify(url));
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const signIn = (user, rm) => {
    // setToken('');
    // setAuthToken("123123");
    // setTimeout(() => setIsAuthenticated(false), 100);
    if (rm) {
      localStorage.setItem('userProfile', JSON.stringify(user));
    }
    else {
      sessionStorage.setItem('userProfile', JSON.stringify(user));
    }

    setIsAuthenticated(true);

    setUserProfile(user)
    setUserAvatarFromFirebase(user.id, rm)
    favouriteService.getAllFavourte(user.id)
      .then((response) => {
        var mediaList = response.data.map((item) => item.id.mid);
        console.log(mediaList)
        setFavouriteList(mediaList);
        if (rm) {
          localStorage.setItem("userFavourite", JSON.stringify(mediaList));
        }
        else {
          sessionStorage.setItem("userFavourite", JSON.stringify(mediaList));
        }
      })
  }
  const handleSetUserProfile = (user) => {
    userService.create(user).then((response) => {
      if (localStorage.getItem('userProfile')) {
        console.log(JSON.parse(localStorage.getItem('userProfile')))
        if (JSON.parse(localStorage.getItem('userProfile')).id === userProfile.id) {
          console.log('update local storage');
          localStorage.setItem('userProfile', JSON.stringify(user));
        }
      }
      console.log(user)
      setUserProfile(user)
    });

  }

  const signOut = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userFavourite');
    localStorage.removeItem('userAvatar');
    sessionStorage.removeItem('userProfile');
    sessionStorage.removeItem('userFavourite');
    sessionStorage.removeItem('userAvatar');
    setIsAuthenticated(false);
  }

  const addFavourite = (media) => {
    const newFavouriteList = [...favouriteList, media];
    setFavouriteList(newFavouriteList);
    favouriteService.addFavourite(userProfile.id, media, { time: currentTime(), describe: "Like" })
    if (sessionStorage.getItem('userFavourite')) {
      sessionStorage.setItem("userFavourite", JSON.stringify(newFavouriteList));
    }
    if (localStorage.getItem('userFavourite')) {
      localStorage.setItem("userFavourite", JSON.stringify(newFavouriteList));
    }
  };

  const removeFavourite = (media) => {
    const newFavouriteList = favouriteList.filter((item) => item !== media);
    setFavouriteList(newFavouriteList);
    favouriteService.removeFavourite(userProfile.id, media)
    if (sessionStorage.getItem('userFavourite')) {
      sessionStorage.setItem("userFavourite", JSON.stringify(newFavouriteList));
    }
    if (localStorage.getItem('userFavourite')) {
      localStorage.setItem("userFavourite", JSON.stringify(newFavouriteList));
    }
  };

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
        setUserAvatarFromFirebase,
        favouriteList,
        addFavourite,
        removeFavourite,
        handleSetUserProfile
        // recommendMovies
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;