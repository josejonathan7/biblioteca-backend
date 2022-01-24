"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const authorRepositorie_1 = __importDefault(require("../repositories/authorRepositorie"));
const workREpositorie_1 = __importDefault(require("../repositories/workREpositorie"));
class WorksWritesService {
    constructor() {
        this.connection = Promise.resolve(this.load());
    }
    async createWork({ title, publishingCompany, image, author }) {
        const workRepositorie = await this.connection.then(con => con.getCustomRepository(workREpositorie_1.default));
        const authorRepositorie = await this.connection.then(con => con.getCustomRepository(authorRepositorie_1.default));
        const titleExists = await workRepositorie.find({ where: { title } });
        if (titleExists.length > 0) {
            throw new Error("The Work title already exist");
        }
        const imageExist = await workRepositorie.find({ where: { image } });
        if (imageExist.length > 0) {
            throw new Error("The Work image already exist");
        }
        const authorExists = await authorRepositorie.find({ where: { name: author } });
        if (authorExists.length < 1) {
            await authorRepositorie.save({
                name: author
            });
        }
        const authorFind = await authorRepositorie.find({ where: { name: author } });
        const authorId = (0, class_transformer_1.instanceToPlain)(authorFind);
        const saveWork = workRepositorie.create({
            title,
            publishingCompany,
            image,
            author: {
                id: authorId[0].id
            }
        });
        const createdWork = await workRepositorie.save(saveWork);
        return (0, class_transformer_1.instanceToPlain)(createdWork);
    }
    async getAll() {
        const workWriteRepositorie = await this.connection.then(con => con.getCustomRepository(workREpositorie_1.default));
        const worksFind = await workWriteRepositorie.find();
        if (worksFind.length < 1) {
            throw new Error("Works not found");
        }
        return (0, class_transformer_1.instanceToPlain)(worksFind);
    }
    async updateWork({ title, publishingCompany, image, author }, id) {
        const workRepositorie = await this.connection.then(con => con.getCustomRepository(workREpositorie_1.default));
        const authorRepositorie = await this.connection.then(con => con.getCustomRepository(authorRepositorie_1.default));
        const authorExists = await authorRepositorie.find({ where: { name: author } });
        if (authorExists.length < 1) {
            await authorRepositorie.save({
                name: author
            });
        }
        const authorFind = await authorRepositorie.find({ where: { name: author } });
        const authorId = (0, class_transformer_1.instanceToPlain)(authorFind);
        const updatedWork = await workRepositorie.update(id, {
            title,
            publishingCompany,
            image,
            author: {
                id: authorId[0].id
            }
        });
        const affected = updatedWork.affected ? updatedWork.affected : 0;
        if (affected < 1) {
            throw new Error("Update failed");
        }
        return updatedWork.affected;
    }
    async deleteWork(id) {
        const workRepositorie = await this.connection.then(con => con.getCustomRepository(workREpositorie_1.default));
        const deletedWork = await workRepositorie.delete(id);
        const affected = deletedWork.affected ? deletedWork.affected : 0;
        if (affected < 1) {
            throw new Error("Work not found to be deleted");
        }
        return deletedWork.affected;
    }
    async load() {
        const connection = await (0, typeorm_1.createConnection)("sqliteDb").then(con => con).catch(() => (0, typeorm_1.getConnection)("sqliteDb"));
        return connection;
    }
}
exports.default = WorksWritesService;
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
