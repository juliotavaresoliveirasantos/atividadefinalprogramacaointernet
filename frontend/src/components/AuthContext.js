// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Função para login
  const login = async (usuario, senha) => {
    try {
      const response = await api.post('/login', { usuario, senha });
      setUsuario(usuario); // Armazena usuário logado
      navigate('/'); // Redireciona para a página inicial após login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais incorretas. Tente novamente.');
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      await api.get('/login/logout');
      setUsuario(null); // Remove usuário logado
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
