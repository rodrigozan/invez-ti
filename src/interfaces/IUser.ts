import { Document, Types } from 'mongoose'

interface IUser {
    id: Types.ObjectId
    name: string
    email: string
    password: string
    checkPassword(password: string): Promise<boolean>;
    celular: number
    instruments: string[]
    subteam: string[]
    active: boolean
    role: string
}

export { IUser }