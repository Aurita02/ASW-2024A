import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ControlActivo } from './indexEntity';

@Entity()
export class Activo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    activoTecnologico: string;

    @OneToMany(() => ControlActivo, control => control.activo)
    controles: ControlActivo[];
}
