import {Router} from "express";
import WorksWritersController from "./controllers/WorksWritersController";

const worksWriters = new WorksWritersController();

const routes = Router();

routes.get("/obras/", worksWriters.getWorks);
routes.post("/obras", worksWriters.createWorks);
routes.put("/obras/:id", worksWriters.updateWorks);
routes.delete("/obras/:id", worksWriters.deleteWorks);

export default routes;
