import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ControlActivo } from "./ControlActivo";

@Entity()
export class Departamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departamento: string;

    @Column()
    personaEncargada: string;

    @OneToMany(() => ControlActivo, controlActivo => controlActivo.departamento)
    activosControlados: ControlActivo[];
}