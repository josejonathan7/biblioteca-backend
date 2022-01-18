import { describe, expect, it, beforeEach } from "@jest/globals";
import faker from "@faker-js/faker";
import WorkWriteService from "../../src/services/WorksWritesServices";

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

	it("#create Work", async () => {
		const created = await workWriteService.createWork(data);

		expect(created).toMatchObject({...data});
	});

});
