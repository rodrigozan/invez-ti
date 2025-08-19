import { Document } from 'mongoose';

export interface InvestmentDocument extends Document {
  name: string;
  category: string;
  value: number;
  date: Date;
}