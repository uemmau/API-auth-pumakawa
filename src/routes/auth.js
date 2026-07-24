import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import * as utils from '../utilities/uIndex.js';
import { verificarToken } from '../middlewares/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
    try {
        const { usuario, password, nombre, email } = req.body;
        
        const errores = utils.validarRegistro(usuario, password, nombre, email);
        if (errores.length > 0) {
            return res.status(400).json({ mensaje: 'Errores de validación', errores });
        }

        const userExistente = await utils.getUser(usuario);
        if (userExistente) {
            return res.status(400).json({ mensaje: 'El nombre de usuario ya está en uso' });
        }

        const emailExistente = await utils.getUserByEmail(email);
        if (emailExistente) {
            return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
        }

        const tokenValidacion = crypto.randomUUID();
        const pwdHash = await utils.encrypt(password); // cryptoHash / encrypt
        
        await utils.postUser(usuario, pwdHash, email, nombre, tokenValidacion);
        
        // Enviar correo de validación sin bloquear la respuesta
        utils.enviarCorreoValidacion(email, nombre, tokenValidacion);

        console.log('Nuevo usuario registrado:', usuario);
        res.status(201).json({ 
            mensaje: 'Usuario registrado con éxito. Se ha enviado un correo para validar tu cuenta.', 
            usuario: usuario 
        });
        
    } catch (error) {
        console.error('Error en /register:', error);
        res.status(500).json({ mensaje: 'Ocurrió un error interno en el servidor' });
    }
});

router.get('/validar/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const user = await utils.getUserByToken(token);
        
        if (!user) {
            return res.status(400).json({ mensaje: 'Token de validación inválido o expirado' });
        }

        if (user.validado) {
            return res.status(400).json({ mensaje: 'Esta cuenta ya está validada' });
        }

        await utils.updateUser(user.id, { validado: true, tokenValidacion: null });

        res.json({ mensaje: '¡Cuenta validada exitosamente! Ya puedes iniciar sesión en Pumakahua.' });
    } catch (error) {
        console.error('Error en /validar:', error);
        res.status(500).json({ mensaje: 'Error interno en el servidor' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        
        const userFound = await utils.getUser(usuario);
        
        if (!userFound) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }
        
        try {
            await utils.verPwd(password, userFound.password);
        } catch (err) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        if (!userFound.validado) {
            return res.status(403).json({ mensaje: 'Debes validar tu correo antes de poder iniciar sesión. Revisa tu bandeja de entrada.' });
        }
        
        const token = jwt.sign(
            { id: userFound.id, usuario: userFound.username }, // note: Supabase uses 'username'
            SECRET_KEY,
            { expiresIn: '15min' },
        );
        
        // Enviar alerta de inicio de sesión
        utils.enviarAlertaLogin(userFound.email, userFound.nombre);

        res.json({ mensaje: `Bienvenido a Pumakahua, ${userFound.nombre}!`, token });
        
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ mensaje: 'Ocurrió un error interno en el servidor' });
    }
});

router.get('/users', verificarToken, async (req, res) => {
    try {
        const { data, error } = await utils.supabase.from('users').select('id, username, email, nombre, validado');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error en /users:', error);
        res.status(500).json({ mensaje: 'Ocurrió un error al leer los usuarios' });
    }
});

router.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: 'Estos son tus datos', usuario: req.usuario });
});

router.put('/cambiar-password', verificarToken, async (req, res) => {
    try {
        const { passwordActual, passwordNueva } = req.body;
        
        if (!passwordActual || !passwordNueva) {
            return res.status(400).json({ mensaje: 'Debés enviar la contraseña actual y la nueva' });
        }
        
        // El req.usuario.id es el UUID o el id que use Supabase
        const { data: user, error } = await utils.supabase.from('users').select('*').eq('id', req.usuario.id).single();
        if (error || !user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        
        try {
            await utils.verPwd(passwordActual, user.password);
        } catch (err) {
            return res.status(401).json({ mensaje: 'La contraseña actual es incorrecta' });
        }
        
        try {
            await utils.verPwd(passwordNueva, user.password);
            // If it succeeds without error, the passwords match
            return res.status(400).json({ mensaje: 'La nueva contraseña no puede ser igual a la actual' });
        } catch (err) {
            // This is expected, the passwords do not match
        }
        
        const errores = utils.validarPassword(passwordNueva);
        if (errores.length > 0) {
            return res.status(400).json({ mensaje: 'La nueva contraseña no cumple los requisitos', errores });
        }
        
        const pwdHash = await utils.encrypt(passwordNueva);
        await utils.updateUser(user.id, { password: pwdHash });
        
        console.log(`${user.username} cambió su contraseña`);
        res.json({ mensaje: 'Contraseña actualizada con éxito' });
        
    } catch (error) {
        console.error('Error en /cambiar-password:', error);
        res.status(500).json({ mensaje: 'Ocurrió un error interno al cambiar la contraseña' });
    }
});

router.delete('/perfil', verificarToken, async (req, res) => {
    try {
        await utils.deleteUser(req.usuario.id);
        console.log(`El usuario ID ${req.usuario.id} ha eliminado su cuenta`);
        res.json({ mensaje: 'Tu cuenta ha sido eliminada exitosamente' });

    } catch (error) {
        console.error('Error en DELETE /perfil:', error);
        res.status(500).json({ mensaje: 'Ocurrió un error interno al intentar eliminar la cuenta' });
    }
});

export default router;
