import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Activo, Departamento } from './indexEntity';

@Entity()
export class ControlActivo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Activo, activo => activo.controles)
    activo: Activo;

    @ManyToOne(() => Departamento, departamento => departamento.controles)
    departamento: Departamento;

    @Column()
    fechaAsignacion: Date;

    @Column()
    personaAsignada: string;

    @Column()
    tiempoDepreciacion: number;
}
