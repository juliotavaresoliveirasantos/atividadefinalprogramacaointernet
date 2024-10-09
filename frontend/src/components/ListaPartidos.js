// src/components/ListaPartidos.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ListaPartidos = () => {
  const [partidos, setPartidos] = useState([]);
  const navigate = useNavigate(); // Para redirecionar após edição

  useEffect(() => {
    carregarPartidos();
  }, []);

  // Função para carregar partidos
  const carregarPartidos = async () => {
    const response = await api.get('/partidos');
    setPartidos(response.data);
  };

  // Função para excluir um partido
  const excluirPartido = async (id) => {
    try {
      await api.delete(`/partidos/${id}`);
      carregarPartidos(); // Recarregar lista após exclusão
    } catch (error) {
      console.error('Erro ao excluir partido:', error);
    }
  };

  // Função para editar um partido
  const editarPartido = (id) => {
    navigate(`/cadastro-partido/${id}`); // Redirecionar para a página de edição com o ID do partido
  };

  return (
    <div className="container">
      <h2>Lista de Partidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Número de Registro</th>
            <th>Ações</th> {/* Coluna para ações de edição e exclusão */}
          </tr>
        </thead>
        <tbody>
          {partidos.map((partido) => (
            <tr key={partido.id}>
              <td>{partido.id}</td>
              <td>{partido.nome}</td>
              <td>{partido.sigla}</td>
              <td>{partido.numero_registro}</td>
              <td>
                <button onClick={() => editarPartido(partido.id)} className="btn-editar">Editar</button>
                <button onClick={() => excluirPartido(partido.id)} className="btn-excluir">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPartidos;
