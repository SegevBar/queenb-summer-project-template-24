import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import  { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import Login from './pages/LoginPage/LoginPage';
import Signup from './pages/SignupPage/SignupPage';
import {useLogout} from './hooks/useLogout'
import UploadForm from './components/uploadForm/uploadForm';
import ItemsGrid from './components/ItemsGrid/ItemsGrid';
import SuccessPage from './components/uploadForm/SuccessPage'; 
import Navbar from './components/Navbar/Navbar';
import ItemDetails from './components/ItemDetails/ItemDetails';

function App() {
  const {user} = useAuthContext() // this returns 'null' if the user is logged out, or a user object if the user is logged in

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
        <Navbar />
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/items/:gender" element={<ItemsGrid />} />
            <Route path="/items/:gender" element={<ItemsGrid />} />
            <Route path="/items/:gender/:id" element={<ItemDetails />} />

            {/* Protecting routes - logged in users shouldn't be able to reach the login/signup forms, and logged out users the upload-items form */}
            <Route 
            path="/login" 
            element={!user ? <Login/>: <Navigate to={'/'}/> } 
            />
            <Route 
            path="/signup" 
            element={!user ? <Signup/>: <Navigate to={'/'}/> } 
            />
            <Route path="/upload"
            element={user ? <UploadForm /> : <Navigate to={'/signup'}/> } 
            />

          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; QueenB Summer Camp Project 2024</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
