import React, { useEffect } from "react";
import { AuthContext } from "./context/authContext";
import recommedationService from "./api/recommedationService";

const IndexHelper = () => {
  const authContext = React.useContext(AuthContext);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("timer");
      if (authContext.isAuthenticated) {
        console.log("authContext");
        recommedationService.generateRecommendation(authContext.userProfile.id);
      }
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
    </>
  );
};

export default IndexHelper;