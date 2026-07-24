import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Using default .env instead of aut.env

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    console.warn('Falta configurar SECRET_KEY en las variables de entorno');
}

export function verificarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ mensaje: 'Token inválido o expirado' });
        req.usuario = decoded;
        next();
    });
}
