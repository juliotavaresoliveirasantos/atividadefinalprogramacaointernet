// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; // Certifique-se de que o api.js está configurado corretamente
import './Navbar.css'; // Arquivo opcional para estilização

const Navbar = () => {
  const navigate = useNavigate(); // useNavigate para navegação

  // Função para lidar com o logout
  const handleLogout = async () => {
    try {
      await api.get('/login/logout'); // Chama a rota de logout no backend
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Sistema Eleitoral</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/partidos" className="nav-links">Partidos</Link>
          </li>
          <li className="nav-item">
            <Link to="/candidatos" className="nav-links">Candidatos</Link>
          </li>
          <li className="nav-item">
            <Link to="/cadastro-partido" className="nav-links">Cadastrar Partido</Link>
          </li>
          <li className="nav-item">
            <Link to="/cadastro-candidato" className="nav-links">Cadastrar Candidato</Link>
          </li>
          <li className="nav-item">
            {/* Use um botão para o logout, pois precisamos capturar o clique */}
            <button onClick={handleLogout} className="nav-links logout-button">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
