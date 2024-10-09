// src/components/CadastroPartido.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const CadastroPartido = () => {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [numeroRegistro, setNumeroRegistro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const { id } = useParams(); // Obter o ID da URL para editar
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Se houver um ID, carregue os dados do partido para edição
      carregarPartido();
    }
  }, [id]);

  const carregarPartido = async () => {
    const response = await api.get(`/partidos/${id}`);
    const { nome, sigla, numero_registro } = response.data;
    setNome(nome);
    setSigla(sigla);
    setNumeroRegistro(numero_registro);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Se existe um ID, atualiza o registro
        await api.put(`/partidos/${id}`, { nome, sigla, numero_registro: numeroRegistro });
        setMensagem('Partido atualizado com sucesso!');
      } else {
        // Se não, cria um novo registro
        await api.post('/partidos', { nome, sigla, numero_registro: numeroRegistro });
        setMensagem('Partido cadastrado com sucesso!');
      }
      navigate('/partidos');
    } catch (error) {
      setMensagem('Erro ao cadastrar/atualizar partido.');
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Partido' : 'Cadastrar Partido'}</h2>
      <form onSubmit={handleCadastro}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <label>Sigla:</label>
        <input type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} required />
        <label>Número de Registro:</label>
        <input type="number" value={numeroRegistro} onChange={(e) => setNumeroRegistro(e.target.value)} required />
        <button type="submit">{id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroPartido;
