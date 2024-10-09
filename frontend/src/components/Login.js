// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth(); // Obtém a função de login do contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(usuario, senha); // Chama a função de login passando as credenciais
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Usuário:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
