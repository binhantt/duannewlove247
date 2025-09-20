import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/Users";
import { Knex } from "knex";
class UserRepositoryMysql implements IUserRepository {
  constructor(private  db: Knex) { }
  async create(user: User): Promise<User> {
    const [id] = await this.db<User>("users").insert(user); // MySQL trả về insertId
    return { ...user, id }; // Trả về user có id
  }
  async findByFacebookId(facebookId: string): Promise<User | null> {
    return (await this.db<User>("users")
      .where({ facebook_id: facebookId })
      .first()) ?? null;
  }
  async findByEmail(email: string): Promise<User | null> {
    return (await this.db<User>("users")
      .where({ email: email })
      .first()) ?? null;
  }
  async update(user: User): Promise<User> {
    console.log( user)
    if (!user.id) throw new Error("User id is required for update");
  
    await this.db<User>("users")
      .where({ id: user.id })
      .update({
        ...user,
        updated_at: new Date(),
      });
  
    // Sau khi update, fetch lại user
    const updatedUser = await this.db<User>("users").where({ id: user.id }).first();
    if (!updatedUser) throw new Error("User not found after update");
  
    return updatedUser;
  }
  
  async delete(id: string): Promise<void> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new Error(`Invalid id for delete: ${id}`);
    }
    await this.db<User>("users").where({ id: parsedId }).delete();
  }
  async findById(id: string): Promise<User | null> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new Error(`Invalid id for findById: ${id}`);
    }
    return (await this.db<User>("users")
      .where({ id: parsedId })
      .first()) ?? null;
  }
  
}

export default UserRepositoryMysql;
