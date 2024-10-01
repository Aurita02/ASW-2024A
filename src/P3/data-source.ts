import { DataSource } from 'typeorm';
import { Activo, Departamento, ControlActivo } from './entity/indexEntity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'bdd-departamentos',
    synchronize: true,
    logging: true,
    entities: [Activo, Departamento, ControlActivo],
});

// Inicializar la base de datos y mostrar el resultado
AppDataSource.initialize()
    .then(() => {
        console.log("Base de datos funcionando correctamente");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos", error);
    });
