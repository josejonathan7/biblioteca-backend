import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import AuthorEntity from "./authorEntity";


@Entity("tb_obras")
export default class WorkEntity {

	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;


	@Column({
		type: "text"
	})
		title!: string;

	@Column({
		length: 80,
		type: "text"
	})
		publishingCompany!: string;

	@Column({
		length: 250,
		type: "text"
	})
		image!: string;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@ManyToOne(type => AuthorEntity, works => WorkEntity, {eager: true})
		author!: AuthorEntity;

}
