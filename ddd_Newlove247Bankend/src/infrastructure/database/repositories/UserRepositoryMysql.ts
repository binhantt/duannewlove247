import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/Users";
import { Knex } from "knex";

class UserRepositoryMysql implements IUserRepository {
  constructor(private db: Knex) { }

  async create(user: User): Promise<User> {
    const [created] = await this.db<User>("users")
      .insert(user)
      .returning("*");
    return created;
  }

  async update(user: User): Promise<User> {
    if (!user.id) throw new Error("User id is required for update");
    const [updated] = await this.db<User>("users")
      .where({ id: user.id })
      .update({
        ...user,
        updatedAt: new Date(),
      })
      .returning("*");
    return updated;
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

  async findByGoogleId(googleId: string): Promise<User | null> {
    return (await this.db<User>("users")
      .where({ google_id: googleId })
      .first()) ?? null;
  }

  async createGoogleUser(user: User): Promise<User> {
    const [created] = await this.db<User>("users")
      .insert({
        google_id: user.google_id,  // chú ý sửa chính tả, trước bạn ghi sai gooole_id
        name: user.name,
        email: user.email,
        avatar_url: user.avatarUrl ?? null,
        role: user.role,
        created_at: new Date(),   // ✅ snake_case
        updated_at: new Date(),   // ✅ snake_case
      })
      .returning("*");
    return created;
  }
}

export default UserRepositoryMysql;
