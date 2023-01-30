import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React from "react";
import MediaList from "./components/mediaList";
import AddMedia from "./components/addMedia";
import Media from "./components/media";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import HomePage from "./pages/homePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SignUpPage from "./pages/signUpPage";

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
      contrastText: '#000',
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MediaList />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/medias/movie/:id" element={<MovieDetailPage />} />
            <Route path="/add" element={<AddMedia />} />
            {/* <Route path="/medias/:id" element={<Media />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);