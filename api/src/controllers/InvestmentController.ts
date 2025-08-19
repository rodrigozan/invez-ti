import BaseController from './BaseController';
import InvestmentService from '../services/InvestmentService';

class InvestmentController extends BaseController<any> {}

export default new InvestmentController(InvestmentService);