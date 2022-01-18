import { Connection, createConnection, getConnection, getCustomRepository } from "typeorm";
import {instanceToPlain} from "class-transformer";
import AuthorRepositorie from "../repositories/authorRepositorie";
import WorkRepositorie from "../repositories/workREpositorie";

interface Work {
	title?: string,
	publishingCompany?: string,
	image?: string,
	author: string
}

export default class WorksWritesService {
	connection: Promise<Connection>;


	constructor () {
		this.connection= Promise.resolve(this.load()) as Promise<Connection>;
	}


	async createWork({title, publishingCompany, image, author}: Work) {
		const workRepositorie = await this.connection.then(con => con.getCustomRepository(WorkRepositorie));
		const authorRepositorie = await this.connection.then(con => con.getCustomRepository(AuthorRepositorie));


		const authorExists = await authorRepositorie.find({where: {name: author}});

		if(authorExists.length < 1) {
			await authorRepositorie.save({
				name: author
			});
		}

		const authorFind = await authorRepositorie.find({where: {name: author}});
		const authorId = instanceToPlain(authorFind);

		const saveWork = workRepositorie.create({
			title,
			publishingCompany,
			image,
			author: {
				id: authorId[0].id
			}

		});

		const createdWork = await workRepositorie.save(saveWork);

		return instanceToPlain(createdWork);
	}

	async load() {
		const connection: Connection = await createConnection("sqliteDb").then(con => con).catch(() => getConnection("sqliteDb"));

		return connection;
	}
}


/*const authorIdArrayEmpty = [];
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
		});*/
