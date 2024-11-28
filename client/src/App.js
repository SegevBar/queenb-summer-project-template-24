import React, { useContext, useState } from 'react'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import UploadAnimal from './pages/UploadAnimalPage/UploadAnimal';
import Login from './pages/LoginPage/LoginPage';
import SignUp from './pages/SignUpPage/SignUpPage';
import styles from './styles/App.module.css';
import NavButton from './components/common/NavButton/NavButton';
import { AuthProvider, AuthContext } from './context/AuthContext'; 
import LogoutButton from './components/LogoutButton/LogoutButton'; 
import FilterModal from './components/Filtering/FilteringCom'

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
  const [showModal, setShowModal] = useState(false); // State to track the modal visibility

  // Open the modal
  const handleOpenModal = () => {
    console.log('Button clicked');
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Link to='http://localhost:3000/' className={styles.appLink}>
          <NavButton><img src="/logo.png" alt="Logo" className={styles.appLogo} /></NavButton>
        </Link>
        <nav className={styles.appNav}>
          <NavButton onClick={handleOpenModal}>Filtering</NavButton>  {/* Toggle modal on click */}

          
        {/* Conditionally render the modal and pass props */}
        <FilterModal isOpen={showModal} onClose={handleCloseModal} />
          {!user ? (
            <>
              <Link to="/LoginPage" className={styles.appLink}>
                <NavButton>LogIn</NavButton>
              </Link>
              <Link to="/SignUpPage" className={styles.appLink}>
                <NavButton>Sign up</NavButton>
              </Link>
            </>
          ) : (
            <>
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

        {/* Conditionally render FilterModal based on state */}
        {handleOpenModal && <FilterModal onClose={handleCloseModal} />}
      </main>

      <footer className={styles.footer}>
        <p>&copy; Happily adopted</p>
      </footer>
    </div>
  );
};

export default App;

//comment
// const AppContent = () => {
//   const { user } = useContext(AuthContext); 
//   return (
//     <div className={styles.app}>
//       <header className={styles.appHeader}>
//         <Link to='http://localhost:3000/' className={styles.appLink}>
//           <NavButton><img src="/logo.png" alt="Logo" className={styles.appLogo} /></NavButton>
//         </Link>
//         <nav className={styles.appNav}>
//         <NavButton>filtering</NavButton>
//           {/* Conditionally show Login and Sign Up buttons if not logged in */}
//           {!user ? (
//             <>
//               <Link to="/LoginPage" className={styles.appLink}>
//                 <NavButton>Login</NavButton>
//               </Link>
//               <Link to="/SignUpPage" className={styles.appLink}>
//                 <NavButton>Sign up</NavButton>
//               </Link>
//             </>
//           ) : (
//             <>
//               {/* Show Logout button and Upload Animal link if user is logged in */}
//               <LogoutButton />
//               <Link to="/UploadAnimal" className={styles.appLink}>
//                 <NavButton>Upload Animal</NavButton>
//               </Link>
//             </>
//           )}
//         </nav>
//       </header>
//       <main className={styles.main}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/UploadAnimal" element={<UploadAnimal />} />
//           <Route path="/LoginPage" element={<Login />} />
//           <Route path="/SignUpPage" element={<SignUp />} />
//         </Routes>
//       </main>
//       <footer className={styles.footer}>
//         <p>&copy; Happily adopted</p>
//       </footer>
//     </div>
//   );
// };

// export default App;
