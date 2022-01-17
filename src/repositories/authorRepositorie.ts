import { EntityRepository, Repository } from "typeorm";
import AuthorEntity from "../entitys/authorEntity";

@EntityRepository(AuthorEntity)
export default class AuthorRepositorie extends Repository<AuthorEntity> {}
