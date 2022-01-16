import {Router} from "express";
import WorksWriters from "./controllers/WorksWriters";

const worksWriters = new WorksWriters();

const routes = Router();

routes.get("/obras/", worksWriters.getWorks);


export default routes;