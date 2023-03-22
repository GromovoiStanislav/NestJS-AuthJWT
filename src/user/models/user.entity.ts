import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

}