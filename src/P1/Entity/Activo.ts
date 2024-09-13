// Activos.ts
export interface IActivo {
    id: number;
    activoTecnologico: string;
}

export const activos: IActivo[] = [
    { id: 1, activoTecnologico: 'Laptop Dell' },
    { id: 2, activoTecnologico: 'Servidor HP' },
    { id: 3, activoTecnologico: 'Router Cisco' },
    { id: 4, activoTecnologico: 'Impresora Canon' },
    { id: 5, activoTecnologico: 'Proyector Epson' }
];