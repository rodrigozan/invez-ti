import BaseService from './BaseService';
import { InvestmentDocument } from '../interfaces/IInvestment';
import InvestmentModel from '../models/InvestmentModel';

class InvestmentService extends BaseService<InvestmentDocument> {}

export default new InvestmentService(InvestmentModel);
