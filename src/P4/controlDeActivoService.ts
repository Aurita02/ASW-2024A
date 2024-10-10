import { AppDataSource } from "./data-source"; // Asegúrate de importar tu DataSource
import { ControlActivo } from "./entity/indexEntity";

export const crearControl = async (controlData: Partial<ControlActivo>) => {
    const controlRepository = AppDataSource.getRepository(ControlActivo); // Obtén el repositorio desde el DataSource

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
    const controlRepository = AppDataSource.getRepository(ControlActivo); // Obtén el repositorio desde el DataSource

    try {
        const controles = await controlRepository.find();
        console.log("Controles encontrados:", controles);
        return controles;
    } catch (error) {
        console.error("Error al consultar los controles:", error);
        throw error;
    }
};
