import { getRepository } from "typeorm";
import { ControlActivo } from "./Entity/ControlActivo";

// Función para crear un nuevo ControlActivo
export const crearControlActivo = async (controlData: Partial<ControlActivo>) => {
    const controlActivoRepository = getRepository(ControlActivo);

    const nuevoControlActivo = controlActivoRepository.create(controlData);

    try {
        const controlGuardado = await controlActivoRepository.save(nuevoControlActivo);
        console.log("ControlActivo creado con éxito:", controlGuardado);
        return controlGuardado;
    } catch (error) {
        console.error("Error al crear el ControlActivo:", error);
        throw error;
    }
};

// Función para consultar todos los ControlActivo
export const consultarControlActivo = async () => {
    const controlActivoRepository = getRepository(ControlActivo);

    try {
        const controles = await controlActivoRepository.find();
        console.log("Controles Activos encontrados:", controles);
        return controles;
    } catch (error) {
        console.error("Error al consultar los ControlActivo:", error);
        throw error;
    }
};
