import React from 'react';
import {
  AuthProvider,
  AuthService
} from 'react-oauth2-pkce';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';

import './App.css'

const authService = new AuthService({
  clientId: 'public',
  provider: 'http://localhost:8080/oauth',
  redirectUri: 'http://localhost:3000',
  scopes: ['read', 'write']
});

function App() {
  return (
    <AuthProvider authService={authService} >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
