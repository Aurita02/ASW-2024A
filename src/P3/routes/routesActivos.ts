import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Activo } from '../entity/indexEntity';

const routerActivos = Router();
const Datos = AppDataSource.getRepository(Activo);

// Obtener todos los activos
routerActivos.get('/get', async (req, res) => {
    try {
        const activos = await Datos.find();
        res.json(activos);
    } catch (error) {
        res.status(500).json({ message: 'Ha habido un problema al obtener los datos de activos', error });
    }
});

// Obtener un activo por ID
routerActivos.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const activo = await Datos.findOne({ where: { id: parseInt(id) } });
        if (activo) {
            res.json(activo);
        } else {
            res.status(404).json({ message: 'Datos del activo no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener datos del activo', error });
    }
});

// Crear un nuevo activo
routerActivos.post('/post', async (req, res) => {
    const { activoTecnologico } = req.body;
    const activo = new Activo();
    activo.activoTecnologico = activoTecnologico;

    try {
        await Datos.save(activo);
        res.status(201).json(activo);
    } catch (error) {
        res.status(500).json({ message: 'Error al ingresar datos del activo', error });
    }
});

// Actualizar un activo
routerActivos.patch('/patch', async (req, res) => {
    const { id, activoTecnologico } = req.body;
    try {
        const editar = await Datos.update(id, { activoTecnologico });
        if (editar.affected === 0) {
            res.status(404).json({ message: 'Datos del activo no encontrados' });
        }
        const activoEditado = await Datos.findOne({ where: { id } });
        res.status(200).json(activoEditado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar datos del activo', error });
    }
});

// Eliminar un activo
routerActivos.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const borrar = await Datos.delete({ id: parseInt(id) });
        if (borrar.affected === 0) {
            res.status(404).json({ message: 'Datos del activo no encontrado' });
        } else {
            res.status(200).json({ message: 'Datos del activo eliminados correctamente' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar datos del activo', error });
    }
});

export default routerActivos;
