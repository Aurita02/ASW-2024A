import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Departamento } from '../entity/indexEntity';

const routerDepartamentos = Router();
const departamentoRepository = AppDataSource.getRepository(Departamento);

routerDepartamentos.get('/get', async (req, res) => {
    try {
        const departamentos = await departamentoRepository.find();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los departamentos' });
    }
});

routerDepartamentos.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await departamentoRepository.findOneBy({ id: parseInt(id) });
        if (departamento) {
            res.json(departamento);
        } else {
            res.status(404).json({ message: 'Departamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el departamento' });
    }
});

routerDepartamentos.post('/post', async (req, res) => {
    const { departamento, personaEncargada } = req.body;
    const nuevoDepartamento = departamentoRepository.create({ departamento, personaEncargada });

    try {
        await departamentoRepository.save(nuevoDepartamento);
        res.status(201).json(nuevoDepartamento);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el departamento', error });
    }
});

routerDepartamentos.patch('/patch', async (req, res) => {
    const { id, departamento, personaEncargada } = req.body;
    try {
        await departamentoRepository.update(id, { departamento, personaEncargada });
        const departamentoActualizado = await departamentoRepository.findOneBy({ id });
        res.status(200).json(departamentoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el departamento', error });
    }
});

routerDepartamentos.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await departamentoRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.status(200).json({ message: 'Departamento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el departamento', error });
    }
});

export default routerDepartamentos;
