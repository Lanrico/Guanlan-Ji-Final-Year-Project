import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React from "react";
import MediaList from "./components/mediaList";
import AddMedia from "./components/addMedia";
import Media from "./components/media";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MediaList />} />
        <Route path="/homepage" element={<MediaList />} />
        <Route path="/add" element={<AddMedia />} />
        <Route path="/medias/:id" element={<Media />} />
      </Routes>
    </BrowserRouter>
  )
}
const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);