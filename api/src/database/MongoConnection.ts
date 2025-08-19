import mongoose from "mongoose";
import { config } from "../config/config";

export class Connection {
    static async connect() {
        try {
            await mongoose.connect(config.mongoUri as string);
            console.log('Dabatase connected');
            
        } catch (error) {
            throw new Error(error)
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
        } catch (error) {
            throw new Error(error)
        }
    }
}