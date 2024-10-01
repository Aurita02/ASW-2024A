import "reflect-metadata";
import server from "express";
import routerActivos from "./routes/routesActivos";
import routerDepartamentos from "./routes/routesDepartamentos";
import routerControles from "./routes/routesControlActivos";

const app = server();
app.use(server.json());

// Rutas
app.use('/Activos', routerActivos);
app.use('/Departamentos', routerDepartamentos);
app.use('/Controles', routerControles);

// Iniciar el servidor
export const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
