// src/components/ListaCandidatos.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ListaCandidatos = () => {
  const [candidatos, setCandidatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarCandidatos();
  }, []);

  const carregarCandidatos = async () => {
    const response = await api.get('/candidatos');
    setCandidatos(response.data);
  };

  const excluirCandidato = async (id) => {
    try {
      await api.delete(`/candidatos/${id}`);
      carregarCandidatos(); // Recarregar lista após exclusão
    } catch (error) {
      console.error('Erro ao excluir candidato:', error);
    }
  };

  const editarCandidato = (id) => {
    navigate(`/cadastro-candidato/${id}`); // Redirecionar para a página de edição com o ID do candidato
  };

  return (
    <div className="container">
      <h2>Lista de Candidatos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Número do Candidato</th>
            <th>Partido</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((candidato) => (
            <tr key={candidato.id}>
              <td>{candidato.id}</td>
              <td>{candidato.nome}</td>
              <td>{candidato.numero_candidato}</td>
              <td>{candidato.partido ? candidato.partido.nome : 'Sem Partido'}</td>
              <td>
                <button onClick={() => editarCandidato(candidato.id)} className="btn-editar">Editar</button>
                <button onClick={() => excluirCandidato(candidato.id)} className="btn-excluir">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCandidatos;
