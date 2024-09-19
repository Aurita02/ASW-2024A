import "reflect-metadata";
import express from "express";
import  routerDepartamento  from "./routes/routesDepartamento";
import  routerControlActivo  from "./routes/routesControlActivo";
import  routerActivo  from "./routes/routesActivo";

const app = express();
app.use(express.json());

// Rutas
app.use('/Departamentos', routerDepartamento);
app.use('/ControlActivo', routerControlActivo);
app.use('/Activos', routerActivo);

// Iniciar el servidor
export const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
