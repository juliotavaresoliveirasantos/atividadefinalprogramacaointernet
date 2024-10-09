// rotas/partidoRoutes.js
import { Router } from 'express';
import PartidoController from '../Controle/partidoCtrl.js';
const router = Router();

router.post('/', PartidoController.criarPartido);
router.get('/', PartidoController.listarPartidos);
router.put('/:id', PartidoController.atualizarPartido);
router.delete('/:id', PartidoController.excluirPartido);

export default router;
