// Controle/partidoCtrl.js
import Partido from '../models/Partido.js';

class PartidoController {
  async criarPartido(req, res) {
    try {
      const partido = await Partido.create(req.body);
      res.status(201).json(partido);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao criar partido: ' + error.message });
    }
  }

  async listarPartidos(req, res) {
    try {
      const partidos = await Partido.findAll();
      res.json(partidos);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao listar partidos: ' + error.message });
    }
  }

  async atualizarPartido(req, res) {
    try {
      const { id } = req.params;
      await Partido.update(req.body, { where: { id } });
      res.json({ mensagem: 'Partido atualizado com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao atualizar partido: ' + error.message });
    }
  }

  async excluirPartido(req, res) {
    try {
      const { id } = req.params;
      await Partido.destroy({ where: { id } });
      res.json({ mensagem: 'Partido excluído com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao excluir partido: ' + error.message });
    }
  }
}

export default new PartidoController();
