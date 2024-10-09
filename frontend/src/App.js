// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login';
import CadastroPartido from './components/CadastroPartido';
import CadastroCandidato from './components/CadastroCandidato';
import ListaPartidos from './components/ListaPartidos';
import ListaCandidatos from './components/ListaCandidatos';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout /> {/* Componente Layout que gerencia Navbar e Conteúdo */}
      </AuthProvider>
    </Router>
  );
};

// Componente Layout para condicionar a exibição do Navbar
const Layout = () => {
  const { usuario } = useAuth(); // Verificar se o usuário está logado

  return (
    <>
      {/* Mostrar Navbar apenas se o usuário estiver logado */}
      {usuario && <Navbar />} 
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Rotas protegidas são renderizadas dentro de PrivateRoute */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/partidos"
            element={
              <PrivateRoute>
                <ListaPartidos />
              </PrivateRoute>
            }
          />
          <Route
            path="/candidatos"
            element={
              <PrivateRoute>
                <ListaCandidatos />
              </PrivateRoute>
            }
          />
          <Route
            path="/cadastro-partido/:id?"
            element={
              <PrivateRoute>
                <CadastroPartido />
              </PrivateRoute>
            }
          />
          <Route
            path="/cadastro-candidato/:id?"
            element={
              <PrivateRoute>
                <CadastroCandidato />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
