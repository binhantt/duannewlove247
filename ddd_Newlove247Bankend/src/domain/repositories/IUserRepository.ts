import { User } from "../entities/Users"

export interface IUserRepository {
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByGoogleId(googleId: string): Promise<User | null>;
    createGoogleUser(user: User): Promise<User>;
    createFacebookUser(user: User): Promise<User>;
    findByFacebookId(facebookId: string): Promise<User | null>;
}
