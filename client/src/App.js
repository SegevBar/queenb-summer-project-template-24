import React from 'react';
import './styles/global.css'; // Importing global styles for the application
import Navbar from './components/Navbar'; // Importing the Navbar component for consistent navigation across pages
import HomePage from './pages/HomePage/HomePage'; // Importing the HomePage component to be rendered on the home route
import RecipeDetails from './pages/RecipeDetails'; // Importing the RecipeDetails component for displaying individual recipe details
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing React Router components for client-side routing

function App() {
  return (
    <Router>
      {/* Router wraps the entire app and enables client-side routing */}
      <div className="App">
        <Navbar /> 
        {/* Navbar component is rendered on all pages for navigation */}
        <div className="content">
          {/* Routes component contains all the Route components that define the application's routing paths */}
          <Routes>
            {/* Define a route that captures the "id" parameter in the URL and renders the RecipeDetails component */}
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            {/* Define the default home route ("/") and render the HomePage component */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
