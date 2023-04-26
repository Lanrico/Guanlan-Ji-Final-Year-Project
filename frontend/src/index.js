import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import HomePage from "./pages/homePage";
import MovieDetailPage from "./pages/movieDetailPage";
import SignUpPage from "./pages/signUpPage";
import MediaRankPage from "./pages/movieRankPage";
import UserPage from "./pages/userProfilePage";
import { Provider } from "react-redux";
import { store } from './components/userProfileInfo/store';
import LoginPage from "./pages/loginPage";
import MediaContextProvider from "./context/mediaContextProvider";
import AuthContext from "./context/authContext";
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import PaymentPage from "./pages/paymentPage";
import Stripe from "./components/stripe";
import MovieSearchPage from "./pages/movieSearchPage";
import IndexHelper from "./indexHelper";
import ProtectedRoutes from "./protectedRoutes";

const storedUserProfile = sessionStorage.getItem('userProfile') ? sessionStorage.getItem('userProfile') : localStorage.getItem('userProfile');
const initialUserProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;

const storedUserAvatar = sessionStorage.getItem('userAvatar') ? sessionStorage.getItem('userAvatar') : localStorage.getItem('userAvatar');
const initialUserAvatar = storedUserAvatar ? JSON.parse(storedUserAvatar) : null;

const storedUserFavourite = sessionStorage.getItem('userFavourite') ? sessionStorage.getItem('userFavourite') : localStorage.getItem('userFavourite');
const initialUserFavourite = storedUserFavourite ? JSON.parse(storedUserFavourite) : null;

const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   staleTime: 360000,
    //   refetchInterval: 360000,
    //   refetchOnWindowFocus: false
    // },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      // light: '#baffff',
      main: '#3accc0',
      // dark: '#47c8c0',
      contrastText: '#fff',
    },
    secondary: {
      // light: '#ff62b8',
      main: '#ff1688',
      // dark: '#c6005b',
      contrastText: '#fff',
    },
  },
});
const App = () => {

  return (
    <>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <MediaContextProvider>
                <AuthContext initialUserProfile={initialUserProfile} initialUserAvatar={initialUserAvatar} initialUserFavourite={initialUserFavourite}>
                  <IndexHelper></IndexHelper>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/ranking/:media_type/:page/:filter?" element={<MediaRankPage />} />
                    <Route path="/search/:media_type/:searchString/:page/:filter?" element={<MovieSearchPage />} />
                    <Route path="/register" element={<SignUpPage />} />
                    <Route path="/medias/movie/:id" element={<MovieDetailPage />} />
                    <Route element={<ProtectedRoutes />}>
                      <Route path="/user/:user_id/:tab" element={<UserPage />} />
                      <Route path="/user/payment/:step?" element={<PaymentPage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Route path="/forgetPassword" element={<ForgetPasswordPage />} /> */}
                  </Routes>
                </AuthContext>
              </MediaContextProvider>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);