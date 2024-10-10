import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    clave: string; // Aquí puedes almacenar el hash de la clave

    @Column()
    estado: string; // "Activo" o "Inactivo"
}
