import { Router } from 'express';
import InvestmentController from '../controllers/InvestmentController';

const router = Router();
const controller = InvestmentController;

router.post('/investments', controller.create);
router.get('/investments', controller.getAll);
router.get('/investments:id', controller.getById);
router.put('/investments:id', controller.update);
router.delete('/investments:id', controller.delete);

export default router;
