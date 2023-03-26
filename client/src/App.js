import React from "react";
import { Routes, Route } from "react-router-dom";

import IndexPage from "./pages/IndexPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
// import Post from "./Post.js";
// import Header from "./Header";

import "./App.css";
import Layout from "./Layout.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Route>

      
    </Routes>
  );
}

export default App;
