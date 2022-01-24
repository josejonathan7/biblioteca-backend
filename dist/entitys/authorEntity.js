"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AuthorEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const workEntity_1 = __importDefault(require("./workEntity"));
let AuthorEntity = AuthorEntity_1 = class AuthorEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], AuthorEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        type: "text"
    })
], AuthorEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => workEntity_1.default, author => AuthorEntity_1)
], AuthorEntity.prototype, "works", void 0);
AuthorEntity = AuthorEntity_1 = __decorate([
    (0, typeorm_1.Entity)("tb_autores")
], AuthorEntity);
exports.default = AuthorEntity;
