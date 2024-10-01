import { getRepository } from "typeorm";
import { ControlActivo } from "./entity/indexEntity";

export const crearControl = async (controlData: Partial<ControlActivo>) => {
    const controlRepository = getRepository(ControlActivo);

    const nuevoControl = controlRepository.create(controlData);

    try {
        const controlGuardado = await controlRepository.save(nuevoControl);
        console.log("Control creado con éxito:", controlGuardado);
        return controlGuardado;
    } catch (error) {
        console.error("Error al crear el control:", error);
        throw error;
    }
};

export const consultarControles = async () => {
    const controlRepository = getRepository(ControlActivo);

    try {
        const controles = await controlRepository.find();
        console.log("Controles encontrados:", controles);
        return controles;
    } catch (error) {
        console.error("Error al consultar los controles:", error);
        throw error;
    }
};
