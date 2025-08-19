// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Importação das rotas
// import investmentRoutes from './routes/investmentRoutes';
// import userRoutes from './routes/userRoutes';
// import comparisonRoutes from './routes/comparisonRoutes';

// // Importação dos middlewares customizados
// import { errorMiddleware } from './middlewares/errorMiddleware';

const app: Application = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rotas
// app.use('/api/investments', investmentRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/comparisons', comparisonRoutes);

// // Middleware de tratamento de erros (deve ser o último!)
// app.use(errorMiddleware);

export default app;
