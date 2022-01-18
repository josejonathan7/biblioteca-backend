import {Router} from "express";
import WorksWritersController from "./controllers/WorksWritersController";

const worksWriters = new WorksWritersController();

const routes = Router();

routes.get("/obras/", worksWriters.getWorks);


export default routes;
