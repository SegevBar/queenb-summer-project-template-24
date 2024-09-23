import React from 'react';
import './styles/global.css';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage/HomePage';
import RecipeDetails from './RecipeDetails'; // Ensure this path is correct
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Use the element prop for rendering */}
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
