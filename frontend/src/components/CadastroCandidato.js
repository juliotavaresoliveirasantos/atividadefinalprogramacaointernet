// src/components/CadastroCandidato.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const CadastroCandidato = () => {
  const [nome, setNome] = useState('');
  const [numeroCandidato, setNumeroCandidato] = useState('');
  const [partidoId, setPartidoId] = useState('');
  const [partidos, setPartidos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const { id } = useParams(); // Obter o ID do candidato para edição
  const navigate = useNavigate();

  useEffect(() => {
    carregarPartidos();
    if (id) {
      // Se existe um ID, carregar os dados do candidato para edição
      carregarCandidato();
    }
  }, [id]);

  // Função para carregar a lista de partidos para o select
  const carregarPartidos = async () => {
    const response = await api.get('/partidos');
    setPartidos(response.data);
  };

  // Função para carregar os dados do candidato para edição
  const carregarCandidato = async () => {
    try {
      const response = await api.get(`/candidatos/${id}`);
      const { nome, numero_candidato, partido_id } = response.data;
      setNome(nome);
      setNumeroCandidato(numero_candidato);
      setPartidoId(partido_id);
    } catch (error) {
      setMensagem('Erro ao carregar dados do candidato.');
    }
  };

  // Função para enviar os dados do formulário ao backend
  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Atualizar candidato existente
        await api.put(`/candidatos/${id}`, {
          nome,
          numero_candidato: numeroCandidato,
          partido_id: partidoId,
        });
        setMensagem('Candidato atualizado com sucesso!');
      } else {
        // Criar novo candidato
        await api.post('/candidatos', {
          nome,
          numero_candidato: numeroCandidato,
          partido_id: partidoId,
        });
        setMensagem('Candidato cadastrado com sucesso!');
      }
      navigate('/candidatos'); // Redirecionar para a lista de candidatos
    } catch (error) {
      setMensagem('Erro ao cadastrar/atualizar candidato.');
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Candidato' : 'Cadastrar Candidato'}</h2>
      <form onSubmit={handleCadastro}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label>Número do Candidato:</label>
        <input
          type="number"
          value={numeroCandidato}
          onChange={(e) => setNumeroCandidato(e.target.value)}
          required
        />
        <label>Partido:</label>
        <select
          value={partidoId}
          onChange={(e) => setPartidoId(e.target.value)}
          required
        >
          <option value="">Selecione um partido</option>
          {partidos.map((partido) => (
            <option key={partido.id} value={partido.id}>
              {partido.nome}
            </option>
          ))}
        </select>
        <button type="submit">{id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroCandidato;
