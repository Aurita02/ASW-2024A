// app.ts
import { IActivo, IDepartamento, IControlActivo, activos, departamentos, controlesActivos } from './Entity/indexEntidades';

// Función para buscar un control activo por ID
function buscarControlActivo(
    id: number, 
    callback: (error: Error | null, controlActivo?: IControlActivo) => void
) {
    const resultadoControlActivo = controlesActivos.find(ca => ca.id === id);
    if (!resultadoControlActivo) {
        callback(new Error(`No se ha encontrado el control activo con id ${id}`));
        return;
    }
    callback(null, resultadoControlActivo);
}

// Nueva función para buscar un control activo por ID usando Promises
function buscarControlActivoAsync(id: number): Promise<IControlActivo> {
    return new Promise((resolve, reject) => {
        buscarControlActivo(id, (error, controlActivo) => {
            if (error) {
                reject(error);
            } else if (controlActivo) {
                resolve(controlActivo);
            }
        });
    });
}

// Función para obtener datos de un servicio REST usando Fetch
async function obtenerDatosREST() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const datos = await response.json();
        console.log('Datos obtenidos del servicio REST:', datos);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener datos del servicio REST:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
    }
}

export { buscarControlActivo, buscarControlActivoAsync, obtenerDatosREST };
