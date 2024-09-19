import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ControlActivo } from "./ControlActivo";

@Entity()
export class Activo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    activoTecnologico: string;

    @OneToMany(() => ControlActivo, controlActivo => controlActivo.activo)
    controles: ControlActivo[];
}
