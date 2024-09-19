import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Activo } from "./Activo";
import { Departamento } from "./Departamento";

@Entity()
export class ControlActivo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Activo, activo => activo.controles)
    activo: Activo;

    @ManyToOne(() => Departamento, departamento => departamento.activosControlados)
    departamento: Departamento;

    @Column()
    fechaAsignacion: string;

    @Column()
    personaAsignada: string;

    @Column()
    tiempoDepreciacion: number;
}
