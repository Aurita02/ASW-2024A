import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ControlActivo } from './indexEntity';

@Entity()
export class Departamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departamento: string;

    @Column()
    personaEncargada: string;

    @OneToMany(() => ControlActivo, control => control.departamento)
    controles: ControlActivo[];
}
