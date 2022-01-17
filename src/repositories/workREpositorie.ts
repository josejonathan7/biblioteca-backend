import { EntityRepository, Repository } from "typeorm";
import WorkEntity from "../entitys/workEntity";

@EntityRepository(WorkEntity)
export default class WorkRepositorie extends Repository<WorkEntity> {

}
