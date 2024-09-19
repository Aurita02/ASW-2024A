import { DataSource } from "typeorm";
import { Activo, ControlActivo, Departamento } from "./Entity/indexEntidades";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3020,
    username: "root",
    password: "",
    database: "bdd-departamentos",
    logging: true,
    entities: [Activo, Departamento, ControlActivo],
    subscribers: [],
    migrations: [],
})