import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../roles/roles.entity";
import {Post} from "../posts/posts.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true, nullable: false})
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @Column({type: "boolean", default: false})
    banned: boolean;

    @Column({type: "varchar", nullable: true})
    banReason: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

    @OneToMany(() => Post, post => post.author)
    posts: Post[]
}