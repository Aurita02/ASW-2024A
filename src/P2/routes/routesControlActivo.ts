import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { ControlActivo } from '../Entity/indexEntidades'; 

const routerControlActivo = Router();
const Datos = AppDataSource.getRepository(ControlActivo);

// Obtener todos los controles de activos
routerControlActivo.get('/get', async (req, res) => {
    try {
        const controles = await Datos.find();
        res.json(controles);
    } catch (error) {
        res.status(500).json({ error: 'Ha habido un problema al obtener los datos de control de activos' });
    }
});

// Obtener un control de activo por ID
routerControlActivo.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const control = await Datos.findOne({ where: { id: parseInt(id) } });
        if (control) {
            res.json(control);
        } else {
            res.status(404).json({ error: 'Datos de control de activo no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de control de activo' });
    }
});

// Crear un nuevo control de activo
routerControlActivo.post('/post', async (req, res) => {
    const { activo, departamento, fechaAsignacion, personaAsignada, tiempoDepreciacion } = req.body;
    const controlActivo = new ControlActivo();
    controlActivo.activo = activo; // Asegúrate de que esto sea correcto según tu modelo
    controlActivo.departamento = departamento; // Asegúrate de que esto sea correcto según tu modelo
    controlActivo.fechaAsignacion = fechaAsignacion;
    controlActivo.personaAsignada = personaAsignada;
    controlActivo.tiempoDepreciacion = tiempoDepreciacion;

    try {
        await Datos.save(controlActivo);
        res.status(201).json(controlActivo);
    } catch (error) {
        res.status(500).json({ error: 'Error al ingresar datos de control de activo', details: error });
    }
});

// Actualizar un control de activo
routerControlActivo.patch('/patch', async (req, res) => {
    const { id, activo, departamento, fechaAsignacion, personaAsignada, tiempoDepreciacion } = req.body;
    try {
        const editar = await Datos.update(id, { activo, departamento, fechaAsignacion, personaAsignada, tiempoDepreciacion });
        if (editar.affected === 0) {
            res.status(404).json({ error: 'Datos de control de activo no encontrados' });
        } else {
            const controlEditado = await Datos.findOne({ where: { id } });
            res.status(200).json(controlEditado);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar datos de control de activo', details: error });
    }
});

// Eliminar un control de activo
routerControlActivo.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const borrar = await Datos.delete({ id: parseInt(id) });
        if (borrar.affected === 0) {
            res.status(404).json({ error: 'Datos de control de activo no encontrados' });
        } else {
            res.status(200).json({ message: 'Datos de control de activo eliminados correctamente' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar datos de control de activo' });
    }
});

export default routerControlActivo;