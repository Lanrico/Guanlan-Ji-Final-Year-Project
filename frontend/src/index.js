import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React from "react";
import AddMedia from "./components/addMedia";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import HomePage from "./pages/homePage";
import MovieDetailPage from "./pages/movieDetailPage";
import SignUpPage from "./pages/signUpPage";
import MediaRankPage from "./pages/movieRankPage";
import UserPage from "./pages/userProfilePage";
import Paperbase from "./examplePages/paperbase/Paperbase";
import ThemeRoutes from './components/userProfileInfo/routes';
import MainRoutes from "./components/userProfileInfo/routes/MainRoutes";
import MainLayout from "./components/userProfileInfo/layout/MainLayout";
import { Provider } from "react-redux";
import { store } from './components/userProfileInfo/store';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/ranking/:media_type" element={<MediaRankPage />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/medias/movie/:id" element={<MovieDetailPage />} />
              <Route path="/add" element={<AddMedia />} />
              <Route path="/user/:user_id" element={<UserPage />} />
              <Route path="/example/paperbase" element={<Paperbase />} />
              <Route path="/example/123" element={<MainLayout />} />
              {/* <Route path="/medias/:id" element={<Media />} /> */}
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);