import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { User } from "../../../domain/entities/Users"
import { Knex } from "knex"

export class UserRepositoryMysql implements IUserRepository {
  constructor(private db: Knex) {}
 
}

export default UserRepositoryMysql