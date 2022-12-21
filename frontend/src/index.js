import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React from "react";
import MediaList from "./components/mediaList";
import AddMedia from "./components/addMedia";
import Media from "./components/media";
import { createTheme, ThemeProvider } from "@mui/material";

import HomePage from "./components/pages/homePage";

const theme = createTheme({
  palette: {
    primary: {
      // light: '#baffff',
      main: '#87e5c1',
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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MediaList />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/add" element={<AddMedia />} />
          <Route path="/medias/:id" element={<Media />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);