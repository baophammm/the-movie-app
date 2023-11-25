import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { GlobalProvider } from './contexts/GlobalContext';

import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </GlobalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
