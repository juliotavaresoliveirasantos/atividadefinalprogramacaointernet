// rotas/candidatoRoutes.js
import { Router } from 'express';
import CandidatoController from '../Controle/candidatoCtrl.js';
const router = Router();

router.post('/', CandidatoController.criarCandidato);
router.get('/', CandidatoController.listarCandidatos);
router.put('/:id', CandidatoController.atualizarCandidato);
router.delete('/:id', CandidatoController.excluirCandidato);

export default router;
