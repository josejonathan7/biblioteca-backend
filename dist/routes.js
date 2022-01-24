"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WorksWritersController_1 = __importDefault(require("./controllers/WorksWritersController"));
const worksWriters = new WorksWritersController_1.default();
const routes = (0, express_1.Router)();
routes.get("/obras/", worksWriters.getWorks);
routes.post("/obras", worksWriters.createWorks);
routes.put("/obras/:id", worksWriters.updateWorks);
routes.delete("/obras/:id", worksWriters.deleteWorks);
exports.default = routes;
