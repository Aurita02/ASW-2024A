import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { authMiddleware } from '../Middlware/authMiddleware';
import { Usuario } from '../entity/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const routerUsuarios = Router();
const usuarioRepository = AppDataSource.getRepository(Usuario);

const secretKey = 'keykey';

routerUsuarios.post('/registro', async (req, res) => {
    const { nombre, clave } = req.body;

    try {
        const usuarioRepo = AppDataSource.getRepository(Usuario);
        const usuarioExistente = await usuarioRepo.findOne({
            where: { nombre }
        });

        if (usuarioExistente) {
            res.status(400).json({
                status: false,
                mensaje: 'El usuario ya existe'
            });
            return; // Terminamos la función aquí
        }

        // Hash de la clave
        const passwordHash = await bcrypt.hash(clave, 10);

        const nuevoUsuario = usuarioRepo.create({
            nombre,
            clave: passwordHash,
            estado: 'Activo'
        });
        await usuarioRepo.save(nuevoUsuario);

        res.status(201).json({
            status: true,
            mensaje: 'Usuario registrado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            mensaje: 'Error al registrar el usuario',
            error
        });
    }
});
routerUsuarios.post('/login', async (req, res) => {
    const { nombre, clave } = req.body;

    try {
        const usuarioRepo = AppDataSource.getRepository(Usuario);
        const usuario = await usuarioRepo.findOne({ where: { nombre } });

        if (!usuario) {
            res.status(400).json({
                status: false,
                mensaje: 'Usuario o clave incorrectos'
            });
            return; 
        }

        // Comparación de la clave ingresada con la clave hasheada
        const esValido = await bcrypt.compare(clave, usuario.clave);
        if (!esValido) {
            res.status(400).json({
                status: false,
                mensaje: 'Usuario o clave incorrectos'
            });
            return;
        }

        const payload = {
            id: usuario.id,
            nombre: usuario.nombre
        };

        // Genera el token JWT
        const token = jwt.sign(payload, secretKey, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({
            status: false,
            mensaje: 'Error en el inicio de sesión',
            error
        });
    }
});



// Obtener todos los usuarios
routerUsuarios.get('/get', authMiddleware, async (req, res) => {
    try {
        const usuarios = await usuarioRepository.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
});

// Obtener un usuario por ID
routerUsuarios.get('/get/:id', authMiddleware, async (req, res) => { 
    const { id } = req.params;
    try {
        const usuario = await usuarioRepository.findOneBy({ id: parseInt(id) });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
});

// Crear un nuevo usuario
routerUsuarios.post('/post', authMiddleware, async (req, res) => {
    const { nombre, clave, estado } = req.body;
    const nuevoUsuario = usuarioRepository.create({ nombre, clave, estado });

    try {
        await usuarioRepository.save(nuevoUsuario);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
});

// Actualizar un usuario
routerUsuarios.patch('/patch', authMiddleware, async(req, res) => { 
    const { id, nombre, clave, estado } = req.body;
    try {
        const result = await usuarioRepository.update(id, { nombre, clave, estado });
        if (result.affected === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const usuarioActualizado = await usuarioRepository.findOneBy({ id });
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
});

// Eliminar un usuario
routerUsuarios.delete('/delete/:id', authMiddleware, async (req, res) => { 
    const { id } = req.params;
    try {
        const result = await usuarioRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
});

export default routerUsuarios;
