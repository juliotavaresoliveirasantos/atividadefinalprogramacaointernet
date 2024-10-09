// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { usuario } = useAuth();

  return usuario ? children : <Navigate to="/login" />; // Se usuário estiver autenticado, mostra conteúdo; caso contrário, redireciona para login
};

export default PrivateRoute;
