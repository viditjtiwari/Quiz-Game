import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./assets/CSS/style.css"
import Home from "./Components/Home";
import RootLayout from "./Components/Common/RootLayout";
import ViewQuiz from "./Components/ViewQuiz";
import AddQuiz from "./Components/AddQuiz";
import PlayQuiz from "./Components/PlayQuiz";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Score from "./Components/Score";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/view-quiz" element={<ViewQuiz />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/score" element={<Score />}/>
        </Route>
      </Routes>
  </BrowserRouter>,
);