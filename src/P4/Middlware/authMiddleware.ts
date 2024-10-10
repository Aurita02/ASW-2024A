import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = '123123'; 

interface TokenPayload {
    id: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
    }else{

    try {
        const verified = jwt.verify(token, secretKey);
        next();
    } catch (error) {
        console.error('Token no válido:', error); // Registro de error
        res.status(400).json({ message: 'Token no válido.' });
    }
}};
