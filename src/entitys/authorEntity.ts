import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_autores")
export default class AuthorEntity {

	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Column({
		length: 100,
		type: "text"
	})
		name!: string;
}
