import React from 'react';
import ReactDOM from 'react-dom/client'; // From react-dom/client in React 18
import './styles/global.css'; 
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  // Wrapping with StrictMode
  <React.StrictMode>
      <App /> 
  </React.StrictMode>
);
