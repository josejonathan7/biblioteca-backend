import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import faker from "@faker-js/faker";
import request from "supertest";
import app from "../../src/app";
import { getCustomRepository } from "typeorm";
import WorkRepositorie from "../../src/repositories/workREpositorie";

describe("#Integration tests", () => {
	let data: {
		title: string,
		publishingCompany: string,
		image: string,
		author: string
	};

	beforeEach(() => {
		data = {
			title: faker.name.title().toLowerCase(),
			publishingCompany: faker.company.companyName().toLowerCase(),
			image: faker.image.abstract(),
			author: faker.name.firstName()
		};
	});

	afterEach(async () => {
		const workWriteRepositorie = getCustomRepository(WorkRepositorie, "sqliteDb");

		await workWriteRepositorie.delete({});
	});

	it("->Should create work end point", async () => {
		const createWork  = await request(app).post("/obras").send(data);

		expect(createWork.status).toBe(201);
		expect(createWork.body.data).toMatchObject({
			...data,
			author: {}
		});
	});

	it("->Should not create work with empty data", async () => {
		const dataEmpty = {
			...data,
			title: ""
		};

		await request(app).post("/obras").send(dataEmpty).expect(400, { message: "All fields must be filled"});
	});

	it("->Should get router end point", async() => {
		await request(app).post("/obras").send(data);

		const getWork = await request(app).get("/obras/");


		expect(getWork.body.data[0]).toMatchObject({
			...data,
			author: {}
		});
	});

	it("->Should update router end point", async () => {
		const created = await request(app).post("/obras").send(data);

		const id = created.body.data.id;

		const updateData = {
			title: faker.name.title().toLowerCase(),
			publishingCompany: faker.company.companyName().toLowerCase(),
			image: faker.image.abstract(),
			author: faker.name.firstName()
		};

		const updatedWork = await request(app).put(`/obras/${id}`).send(updateData);

		expect(updatedWork.status).toBe(200);
		expect(updatedWork.text).toBe("updated with success");
	});

	it("->Should not update with id inválid or empty", async () => {
		const id = "dfadasdqawdawd";

		await request(app).put(`/obras/${id}`).send(data).expect(400, { message: "Id for update with length inválid"});
	});

	it("->Should not update with empty data in body request", async() => {
		const dataEmpty = {
			...data,
			title: ""
		};

		const id = "aaaaaaaqaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

		await request(app).put(`/obras/${id}`).send(dataEmpty).expect(400, { message: "Empty data for update" });
	});

	it("->Should delete router end point", async () => {
		const createWork = await request(app).post("/obras/").send(data);

		const id = createWork.body.data.id;

		const deleteWork = await request(app).delete(`/obras/${id}`);

		expect(deleteWork.status).toBe(200);
		expect(deleteWork.text).toBe("Delete with success");
	});

	it("->Should not delete with id inválid or empty", async () => {
		const id = "dasdsad";

		await request(app).delete(`/obras/${id}`).expect(400, { message: "Id for update with length inválid"});
	});

});
