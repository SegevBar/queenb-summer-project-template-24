import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import styles from "./styles/App.module.css";
import AttractionOverviewPage from "./pages/AttractionOverviewPage/AttractionOverviewPage";
import UploadDataPage from "./pages/UploadDataPage/UploadDataPage";
import AuthProvider from "./context/AuthContext.js";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={styles.app}>
          <header className={styles.appHeader}>
            <img
              src="/project-logo.png"
              alt="Logo"
              className={styles.appLogo}
            />
            <Navbar></Navbar>
          </header>
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/attraction" element={<AttractionOverviewPage />} />
              <Route path="/upload" element={<UploadDataPage />} />
            </Routes>
          </main>
          <footer className={styles.footer}>
            <p>&copy; 2024 My App</p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
