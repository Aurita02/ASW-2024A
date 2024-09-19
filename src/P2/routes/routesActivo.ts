import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Activo } from '../Entity/indexEntidades'; 

const routerActivos = Router();
const Datos = AppDataSource.getRepository(Activo);

// Obtener todos los activos
routerActivos.get('/get', async (req, res) => {
    try {
        const activos = await Datos.find();
        res.json(activos);
    } catch (error) {
        res.status(500).json({ error: 'Ha habido un problema al obtener los datos de activos' });
    }
});

// Obtener un activo por ID
routerActivos.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const activo = await Datos.findOne({
            where: { id: parseInt(id) }
        });
        if (activo) {
            res.json(activo);
        } else {
            res.status(404).json({ error: 'Datos de activo no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de activo' });
    }
});

// Crear un nuevo activo
routerActivos.post('/post', async (req, res) => {
    const { activoTecnologico } = req.body;
    const nuevoActivo = new Activo();
    nuevoActivo.activoTecnologico = activoTecnologico;

    try {
        await Datos.save(nuevoActivo);
        res.status(201).json(nuevoActivo);
    } catch (error) {
        res.status(500).json({ error: 'Error al ingresar datos de activo', details: error });
    }
});

// Actualizar un activo
routerActivos.patch('/patch', async (req, res) => {
    const { id, activoTecnologico } = req.body;
    try {
        const editar = await Datos.update(id, { activoTecnologico });
        if (editar.affected === 0) {
            res.status(404).json({ error: 'Datos de activo no encontrados' });
        }
        const activoEditado = await Datos.findOne({ where: { id } });
        res.status(200).json(activoEditado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar datos de activo', details: error });
    }
});

// Eliminar un activo
routerActivos.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const borrar = await Datos.delete({ id: parseInt(id) });
        if (borrar.affected === 0) {
            res.status(404).json({ error: 'Datos de activo no encontrados' });
        } else {
            res.status(200).json({ message: 'Datos de activo eliminados correctamente' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar datos de activo' });
    }
});

export default routerActivos;