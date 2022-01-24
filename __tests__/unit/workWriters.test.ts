import { describe, expect, it, beforeEach, beforeAll, afterAll, afterEach } from "@jest/globals";
import faker from "@faker-js/faker";
import WorkWriteService from "../../src/services/WorksWritesServices";
import { getCustomRepository } from "typeorm";
import WorkRepositorie from "../../src/repositories/workREpositorie";
import AuthorRepositorie from "../../src/repositories/authorRepositorie";

describe("#Unitary test", () => {
	let data: {
		title: string,
		publishingCompany: string,
		image: string,
		author: string
	};
	let workWriteService: WorkWriteService;

	beforeEach(() => {
		data = {
			title: faker.name.title(),
			publishingCompany: faker.company.companyName(),
			image: faker.image.abstract(),
			author: faker.name.firstName()
		};
	});

	beforeAll(() => {
		workWriteService = new WorkWriteService();
	});

	afterAll(async() => {
		const authorRepositorie = getCustomRepository(AuthorRepositorie, "sqliteDb");
		await authorRepositorie.delete({});
	});

	afterEach(async () => {
		const workWriteRepositorie = getCustomRepository(WorkRepositorie, "sqliteDb");

		await workWriteRepositorie.delete({});
	});

	it("->Should create Work", async () => {
		const created = await workWriteService.createWork(data);

		expect(created).toMatchObject({
			...data,
			author: {}
		});
	});

	it("->Should not create work with existent image", async () => {
		const dataTwo = {
			...data,
			title: faker.name.title()
		};

		await workWriteService.createWork(data);

		try {

			await workWriteService.createWork(dataTwo);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("The Work image already exist");
		}

	});

	it("->Should not create work with existent title", async () => {
		const dataTwo = {
			...data,
			image: faker.image.abstract()
		};

		await workWriteService.createWork(data);

		try {

			await workWriteService.createWork(dataTwo);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("The Work title already exist");
		}

	});

	it("->Should get all works", async () => {
		await workWriteService.createWork(data);

		const dataTwo = {
			...data,
			title: faker.name.title(),
			image: faker.image.animals(),
		};

		const dataThree = {
			title: faker.name.title(),
			publishingCompany: faker.company.companyName(),
			image: faker.image.avatar(),
			author: faker.name.firstName()
		};

		await workWriteService.createWork(dataTwo);
		await workWriteService.createWork(dataThree);

		const getWorks = await workWriteService.getAll();

		expect(getWorks[0]).toMatchObject({
			...data,
			author: {}
		});
	});

	it("->Should not get with empty works", async () => {
		try {
			await workWriteService.getAll();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Works not found");
		}
	});

	it("->Should update work", async() => {
		const createWork = await workWriteService.createWork(data);

		const id = createWork.id;
		const updateObject = {
			title: faker.name.title(),
			publishingCompany: faker.company.companyName(),
			image: faker.image.abstract(),
			author: faker.name.firstName()
		};

		const updatedWork = await workWriteService.updateWork(updateObject, id);

		expect(updatedWork).toBeTruthy();
	});

	it("->Should not update with incorrect Id", async () =>  {
		await workWriteService.createWork(data);

		const id = "asdasd2eqdasdad";

		const updateObject = {
			title: faker.name.title(),
			publishingCompany: faker.company.companyName(),
			image: faker.image.abstract(),
			author: faker.name.firstName()
		};
		try {
			await workWriteService.updateWork(updateObject, id);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Update failed");
		}
	});

	it("->Should delete work",async () => {
		const createWork = await workWriteService.createWork(data);

		const id = createWork.id;

		const deletedProduct = await workWriteService.deleteWork(id);

		expect(deletedProduct).toBeTruthy();
	});

	it("->Should not delete with incorrect Id", async () => {
		await workWriteService.createWork(data);

		const id = "dasdasdasdasdasdas";

		try {
			await workWriteService.deleteWork(id);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.message).toBe("Work not found to be deleted");
		}
	});
});
