import { Schema, model } from 'mongoose';
import { InvestmentDocument } from '../interfaces/IInvestment';

const InvestmentSchema = new Schema<InvestmentDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default model<InvestmentDocument>('investment', InvestmentSchema);
