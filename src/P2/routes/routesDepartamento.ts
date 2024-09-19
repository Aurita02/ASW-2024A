import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Departamento } from '../Entity/indexEntidades';

const routerDepartamentos = Router();
const Datos = AppDataSource.getRepository(Departamento);

// Obtener todos los departamentos
routerDepartamentos.get('/get', async (req, res) => {
    try {
        const departamentos = await Datos.find();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: 'Ha habido un problema al obtener los datos de departamentos' });
    }
});

// Obtener un departamento por ID
routerDepartamentos.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Datos.findOne({
            where: { id: parseInt(id) }
        });
        if (departamento) {
            res.json(departamento);
        } else {
            res.status(404).json({ error: 'Datos de departamento no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de departamento' });
    }
});

// Crear un nuevo departamento
routerDepartamentos.post('/post', async (req, res) => {
    const { departamento, personaEncargada } = req.body;
    const nuevoDepartamento = new Departamento();
    nuevoDepartamento.departamento = departamento;
    nuevoDepartamento.personaEncargada = personaEncargada;

    try {
        await Datos.save(nuevoDepartamento);
        res.status(201).json(nuevoDepartamento);
    } catch (error) {
        res.status(500).json({ error: 'Error al ingresar datos de departamento', details: error });
    }
});

// Actualizar un departamento
routerDepartamentos.patch('/patch', async (req, res) => {
    const { id, departamento, personaEncargada } = req.body;
    try {
        const editar = await Datos.update(id, { departamento, personaEncargada });
        if (editar.affected === 0) {
            res.status(404).json({ error: 'Datos de departamento no encontrados' });
        }
        const departamentoEditado = await Datos.findOne({ where: { id } });
        res.status(200).json(departamentoEditado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar datos de departamento', details: error });
    }
});

// Eliminar un departamento
routerDepartamentos.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const borrar = await Datos.delete({ id: parseInt(id) });
        if (borrar.affected === 0) {
            res.status(404).json({ error: 'Datos de departamento no encontrados' });
        } else {
            res.status(200).json({ message: 'Datos de departamento eliminados correctamente' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar datos de departamento' });
    }
});

export default routerDepartamentos;