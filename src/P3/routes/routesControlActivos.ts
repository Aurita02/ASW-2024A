import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { ControlActivo } from '../entity/indexEntity';

const routerControlActivos = Router();
const Datos = AppDataSource.getRepository(ControlActivo);

// Obtener todos los controles de activos
routerControlActivos.get('/get', async (req, res) => {
    try {
        const controles = await Datos.find();
        res.json(controles);
    } catch (error) {
        res.status(500).json({ message: 'Ha habido un problema al obtener los datos de controles de activos' });
    }
});

// Obtener un control de activo por ID
routerControlActivos.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const control = await Datos.findOne({ where: { id: parseInt(id) } });
        if (control) {
            res.json(control);
        } else {
            res.status(404).json({ message: 'Datos de control de activo no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener datos del control de activo' });
    }
});

// Crear un nuevo control de activo
routerControlActivos.post('/post', async (req, res) => {
    const { fechaAsignacion, personaAsignada, tiempoDepreciacion } = req.body;
    const controlActivo = new ControlActivo();
    controlActivo.fechaAsignacion = fechaAsignacion;
    controlActivo.personaAsignada = personaAsignada;
    controlActivo.tiempoDepreciacion = tiempoDepreciacion;

    try {
        await Datos.save(controlActivo);
        res.status(201).json(controlActivo);
    } catch (error) {
        res.status(500).json({ message: 'Error al ingresar datos del control de activo', error });
    }
});

// Actualizar un control de activo
routerControlActivos.patch('/patch', async (req, res) => {
    const { id, fechaAsignacion, personaAsignada, tiempoDepreciacion } = req.body;
    try {
        const editar = await Datos.update(id, { fechaAsignacion, personaAsignada, tiempoDepreciacion });
        if (editar.affected === 0) {
            res.status(404).json({ message: 'Datos del control de activo no encontrados' });
        }
        const controlEditado = await Datos.findOne({ where: { id } });
        res.status(200).json(controlEditado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar datos del control de activo', error });
    }
});

// Eliminar un control de activo
routerControlActivos.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const borrar = await Datos.delete({ id: parseInt(id) });
        if (borrar.affected === 0) {
            res.status(404).json({ message: 'Datos del control de activo no encontrados' });
        } else {
            res.status(200).json({ message: 'Datos del control de activo eliminados correctamente' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar datos del control de activo' });
    }
});

export default routerControlActivos;
