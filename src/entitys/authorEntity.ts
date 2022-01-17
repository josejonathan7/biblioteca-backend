import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import WorkEntity from "./workEntity";

@Entity("tb_autores")
export default class AuthorEntity {

	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Column({
		length: 100,
		type: "text"
	})
		name!: string;


	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@OneToMany(type => WorkEntity, author => AuthorEntity)
		works!: WorkEntity[];
}
