// Controle/candidatoCtrl.js
import Candidato from '../models/Candidato.js';
import Partido from '../models/Partido.js';

class CandidatoController {
  async criarCandidato(req, res) {
    try {
      const candidato = await Candidato.create(req.body);
      res.status(201).json(candidato);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao criar candidato: ' + error.message });
    }
  }

  async listarCandidatos(req, res) {
    try {
      const candidatos = await Candidato.findAll({ include: { model: Partido, as: 'partido' } });
      res.json(candidatos);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao listar candidatos: ' + error.message });
    }
  }

  async atualizarCandidato(req, res) {
    try {
      const { id } = req.params;
      await Candidato.update(req.body, { where: { id } });
      res.json({ mensagem: 'Candidato atualizado com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao atualizar candidato: ' + error.message });
    }
  }

  async excluirCandidato(req, res) {
    try {
      const { id } = req.params;
      await Candidato.destroy({ where: { id } });
      res.json({ mensagem: 'Candidato excluído com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao excluir candidato: ' + error.message });
    }
  }
}

export default new CandidatoController();
