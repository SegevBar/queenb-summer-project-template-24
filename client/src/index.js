import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import App from './App';
import { DuckProvider } from './context/DuckContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DuckProvider>
        <App /> 
      </DuckProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

