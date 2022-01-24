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
var WorkEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const authorEntity_1 = __importDefault(require("./authorEntity"));
let WorkEntity = WorkEntity_1 = class WorkEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], WorkEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text"
    })
], WorkEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 80,
        type: "text"
    })
], WorkEntity.prototype, "publishingCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 250,
        type: "text"
    })
], WorkEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => authorEntity_1.default, works => WorkEntity_1, { eager: true })
], WorkEntity.prototype, "author", void 0);
WorkEntity = WorkEntity_1 = __decorate([
    (0, typeorm_1.Entity)("tb_obras")
], WorkEntity);
exports.default = WorkEntity;
