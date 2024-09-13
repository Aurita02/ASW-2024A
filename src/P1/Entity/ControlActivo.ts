// ControlActivos.ts
export interface IControlActivo {
    id: number;
    idActivo: number;
    idDepartamento: number;
    fechaAsignacion: string;  // Fecha en formato ISO
    personaAsignada: string;
    tiempoDepreciacion: number;  // En años
}

export const controlesActivos: IControlActivo[] = [
    { id: 1, idActivo: 1, idDepartamento: 1, fechaAsignacion: '2023-01-15', personaAsignada: 'Carlos Gómez', tiempoDepreciacion: 3 },
    { id: 2, idActivo: 2, idDepartamento: 2, fechaAsignacion: '2022-05-10', personaAsignada: 'Ana Pérez', tiempoDepreciacion: 5 },
    { id: 3, idActivo: 3, idDepartamento: 3, fechaAsignacion: '2021-09-12', personaAsignada: 'Luis Martínez', tiempoDepreciacion: 4 },
    { id: 4, idActivo: 4, idDepartamento: 4, fechaAsignacion: '2020-11-20', personaAsignada: 'María López', tiempoDepreciacion: 6 },
    { id: 5, idActivo: 5, idDepartamento: 5, fechaAsignacion: '2019-03-25', personaAsignada: 'Pedro Sánchez', tiempoDepreciacion: 7 }
];
