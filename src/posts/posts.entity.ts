import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../users/users.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true, nullable: false})
    title: string;

    @Column({type: "varchar", nullable: false})
    content: string;

    @Column({type: "varchar"})
    image: string;

    @ManyToOne(() => User, user => user.posts)
    author: User
}