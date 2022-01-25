"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WorksWritesServices_1 = __importDefault(require("../services/WorksWritesServices"));
class WorksWritersController {
    async getWorks(request, response) {
        const worksWritesService = new WorksWritesServices_1.default();
        try {
            const getWorks = await worksWritesService.getAll();
            return response.status(200).json({ data: getWorks });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
    async createWorks(request, response) {
        let { title, publishingCompany, image, author } = request.body;
        title = title.trim().toLowerCase();
        publishingCompany = publishingCompany.trim().toLowerCase();
        image = image.trim().toLowerCase();
        author = author.map(author => author.trim().toLowerCase());
        const worksWritesService = new WorksWritesServices_1.default();
        try {
            if (title === "" || publishingCompany === "" || image === "") {
                throw new Error("All fields must be filled");
            }
            author.forEach(author => {
                if (author === "") {
                    throw new Error("All fields must be filled");
                }
            });
            const createdWork = await worksWritesService.createWork({ title, publishingCompany, image, author });
            return response.status(201).json({ data: createdWork });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
    async updateWorks(request, response) {
        const id = request.params.id;
        let { title, publishingCompany, image, author } = request.body;
        title = title.trim().toLowerCase();
        publishingCompany = publishingCompany.trim().toLowerCase();
        image = image.trim().toLowerCase();
        author = author.map(author => author.trim().toLowerCase());
        const worksWritesService = new WorksWritesServices_1.default();
        try {
            if (id === "" || id.length < 36) {
                throw new Error("Id for update with length inválid");
            }
            if (title === "" || publishingCompany === "" || image === "") {
                throw new Error("Empty data for update");
            }
            author.forEach(author => {
                if (author === "") {
                    throw new Error("Empty author for update");
                }
            });
            await worksWritesService.updateWork({ title, publishingCompany, image, author }, id);
            return response.status(200).send("updated with success");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
    async deleteWorks(request, response) {
        const id = request.params.id;
        const worksWritesService = new WorksWritesServices_1.default();
        try {
            if (id === "" || id.length < 36) {
                throw new Error("Id for update with length inválid");
            }
            await worksWritesService.deleteWork(id);
            return response.status(200).send("Delete with success");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}
exports.default = WorksWritersController;
