import { Connection, createConnection, getConnection } from "typeorm";
import {instanceToPlain} from "class-transformer";
import AuthorRepositorie from "../repositories/authorRepositorie";
import WorkRepositorie from "../repositories/workREpositorie";

interface Work {
	title?: string,
	publishingCompany?: string,
	image?: string,
	author: string[]
}

export default class WorksWritesService {
	connection: Promise<Connection>;


	constructor () {
		this.connection= Promise.resolve(this.load()) as Promise<Connection>;
	}


	async createWork({title, publishingCompany, image, author}: Work) {
		const workRepositorie = await this.connection.then(con => con.getCustomRepository(WorkRepositorie));
		const authorRepositorie = await this.connection.then(con => con.getCustomRepository(AuthorRepositorie));

		const titleExists = await workRepositorie.find({where: {title}});

		if(titleExists.length > 0) {
			throw new Error("The Work title already exist");
		}

		const imageExist = await workRepositorie.find({where: {image}});

		if(imageExist.length > 0) {
			throw new Error("The Work image already exist");
		}

		const authorIdArrayEmpty = [];
		for await (const name of author) {
			const authorExists = await authorRepositorie.find({where: {name}});

			if(authorExists.length < 1) {
				await authorRepositorie.save({
					name
				});
			}

			const authorId = await authorRepositorie.find({where: {name}});

			authorIdArrayEmpty.push(instanceToPlain(authorId));
		}

		const AuthorIdArrayFull = authorIdArrayEmpty.flat().map(item => {
			return {
				id: item.id
			};
		});

		const saveWork = workRepositorie.create({
			title,
			publishingCompany,
			image,
			author: AuthorIdArrayFull

		});

		const createdWork = await workRepositorie.save(saveWork);

		return instanceToPlain(createdWork);
	}

	async getAll() {
		const workWriteRepositorie = await this.connection.then(con => con.getCustomRepository(WorkRepositorie));

		const worksFind = await workWriteRepositorie.find({relations: ["author"]});

		if(worksFind.length < 1) {
			throw new Error("Works not found");
		}

		const filter = worksFind.map(item => {
			const data = {
				id: item.id,
				title: item.title,
				publishingCompany: item.publishingCompany,
				image: item.image,
				author: instanceToPlain(item.author)

			};

			return data;
		});

		return filter;
	}

	async updateWork({title, publishingCompany, image, author}: Work, id: string){
		const workRepositorie = await this.connection.then(con => con.getCustomRepository(WorkRepositorie));
		const authorRepositorie = await this.connection.then(con => con.getCustomRepository(AuthorRepositorie));

		const authorIdArrayEmpty = [];
		for await (const name of author) {
			const authorExists = await authorRepositorie.find({where: {name}});

			if(authorExists.length < 1) {
				await authorRepositorie.save({
					name
				});
			}

			const authorId = await authorRepositorie.find({where: {name}});

			authorIdArrayEmpty.push(instanceToPlain(authorId));
		}

		const authorIdArrayFull = authorIdArrayEmpty.flat().map(item => {
			return {
				id: item.id
			};
		});

		const workExist = await workRepositorie.find({id});

		if(workExist.length < 1) {
			throw new Error("Work not found by update, please create work");
		}

		const updatedWork = await workRepositorie.save({
			id,
			title,
			publishingCompany,
			image,
			author: authorIdArrayFull
		});

		if(!updatedWork) {
			throw new Error("Update failed");
		}

		return true;
	}

	async deleteWork(id: string) {
		const workRepositorie = await this.connection.then(con => con.getCustomRepository(WorkRepositorie));

		const deletedWork = await workRepositorie.delete(id);

		const affected: number = deletedWork.affected ? deletedWork.affected : 0;

		if(affected < 1) {
			throw new Error("Work not found to be deleted");
		}

		return deletedWork.affected;
	}

	async load() {
		const connection: Connection = await createConnection("sqliteDb").then(con => con).catch(() => getConnection("sqliteDb"));

		return connection;
	}
}
