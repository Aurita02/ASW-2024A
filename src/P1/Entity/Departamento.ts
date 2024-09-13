// Departamentos.ts
export interface IDepartamento {
    id: number;
    departamento: string;
    personaEncargada: string;
}

export const departamentos: IDepartamento[] = [
    { id: 1, departamento: 'TI', personaEncargada: 'Sofía Martínez' },
    { id: 2, departamento: 'Administración', personaEncargada: 'Andrés Gómez' },
    { id: 3, departamento: 'Recursos Humanos', personaEncargada: 'Valeria Fernández' },
    { id: 4, departamento: 'Ventas', personaEncargada: 'Juan Carlos Torres' },
    { id: 5, departamento: 'Logística', personaEncargada: 'Laura Rodríguez' }
];

