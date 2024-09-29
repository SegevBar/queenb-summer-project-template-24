import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import UploadForm from './components/uploadForm/uploadForm';
import ItemsGrid from './components/ItemsGrid/ItemsGrid';
import SuccessPage from './components/uploadForm/SuccessPage'; 
import Navbar from './components/Navbar/Navbar';
import ItemDetails from './components/ItemDetails/ItemDetails';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <Navbar />
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/women" element={<ItemsGrid />} />
            <Route path="/men" element={<ItemsGrid />} />
            <Route path="/items/:id" element={<ItemDetails />} />
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
