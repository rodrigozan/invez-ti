// src/routes/investmentRoutes.ts
import { Router } from 'express';
import InvestmentController from 'src/controllers/InvestmentController';

const router = Router();
const controller = InvestmentController;

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
