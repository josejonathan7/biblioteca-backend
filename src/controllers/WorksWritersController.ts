import { Request, Response } from "express";
import WorksWritesService from "../services/WorksWritesServices";

interface IRequestType {
	title: string;
	publishingCompany: string;
	image: string;
	author: string;
}

export default class WorksWritersController {

	async getWorks(request: Request, response: Response) {

		const worksWritesService = new WorksWritesService();

		try {
			const getWorks = await worksWritesService.getAll();

			return response.status(200).json({ data: getWorks });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async createWorks(request: Request, response: Response) {
		let { title, publishingCompany, image, author }: IRequestType = request.body;

		title = title.trim().toLowerCase();
		publishingCompany = publishingCompany.trim().toLowerCase();
		image = image.trim().toLowerCase();
		author = author.trim().toLowerCase();

		const worksWritesService = new WorksWritesService();

		try {

			if(title === "" || publishingCompany === "" || image === "" || author === "") {
				throw new Error("All fields must be filled");
			}

			const createdWork = await worksWritesService.createWork({title, publishingCompany, image, author});


			return response.status(201).json({ data: createdWork });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}


	}

	async updateWorks(request: Request, response: Response) {
		const id: string = request.params.id;
		let { title, publishingCompany, image, author }: IRequestType = request.body;

		title = title.trim().toLowerCase();
		publishingCompany = publishingCompany.trim().toLowerCase();
		image = image.trim().toLowerCase();
		author = author.trim().toLowerCase();

		const worksWritesService = new WorksWritesService();

		try {

			if(id === "" || id.length < 36) {
				throw new Error("Id for update with length inválid");
			}

			if(title === "" || publishingCompany === "" || image === "" || author === ""){
				throw new Error("Empty data for update");
			}

			await worksWritesService.updateWork({title, publishingCompany, image, author}, id);

			return response.status(200).send("updated with success");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async deleteWorks(request: Request, response: Response){
		const id: string = request.params.id;

		const worksWritesService = new WorksWritesService();

		try {
			if(id === "" || id.length < 36) {
				throw new Error("Id for update with length inválid");
			}

			await worksWritesService.deleteWork(id);

			return response.status(200).send("Delete with success");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
}
