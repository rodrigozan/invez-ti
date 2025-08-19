// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import router from './router';
import { Connection } from './database/MongoConnection';
// import { errorMiddleware } from './middlewares/errorMiddleware';

export class App {
    public server: express.Application

    constructor() {
        this.server = express()
        this.middleware()
        this.routes()        
        this.connection()  
        this.documentation()

        this.server.get('/', (_req, res) => res.json({ message: 'root route' }))
    }

    private middleware() {
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use(helmet());
        this.server.use(morgan('dev'));
        //this.server.use(errorMiddleware);
    }    

    private routes() {
        this.server.use('/api', router)
    }

    private documentation() {
        //setupSwagger(this.server)
    }

    private async connection() {
        await Connection.connect()
    }

}
