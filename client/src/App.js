import React, { useContext } from 'react'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import UploadAnimal from './pages/UploadAnimalPage/UploadAnimal';
import Login from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUpPage';
import styles from './styles/App.module.css';
import NavButton from './components/common/NavButton/NavButton';
import { AuthProvider, AuthContext } from './context/AuthContext'; 
import LogoutButton from './components/LogoutButton/LogoutButton'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent /> 
      </BrowserRouter>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { user } = useContext(AuthContext); 
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Link to='http://localhost:3000/' className={styles.appLink}>
          <NavButton><img src="/logo.png" alt="Logo" className={styles.appLogo} /></NavButton>
        </Link>
        <nav className={styles.appNav}>
          {/* Conditionally show Login and Sign Up buttons if not logged in */}
          {!user ? (
            <>
              <Link to="/LoginPage" className={styles.appLink}>
                <NavButton>Login</NavButton>
              </Link>
              <Link to="/SignUpPage" className={styles.appLink}>
                <NavButton>Sign up</NavButton>
              </Link>
            </>
          ) : (
            <>
              {/* Show Logout button and Upload Animal link if user is logged in */}
              <LogoutButton />
              <Link to="/UploadAnimal" className={styles.appLink}>
                <NavButton>Upload Animal</NavButton>
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UploadAnimal" element={<UploadAnimal />} />
          <Route path="/LoginPage" element={<Login />} />
          <Route path="/SignUpPage" element={<SignUp />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <p>&copy; Happily adopted</p>
      </footer>
    </div>
  );
};

export default App;
