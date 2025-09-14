import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/Users";

export class AuthController {
  constructor(private userRepository: IUserRepository) {}

  // Đăng ký user local
  public async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User(
        0,
        name,
        email,
        passwordHash,
        undefined, // googleId
        "local",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        0,
        undefined,
        false,
        true,
        "user",
        "free"
      );

      const created = await this.userRepository.create(user);

      return res.status(201).json({ user: created });
    } catch (err: any) {
      console.error("Register error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Đăng nhập / đăng ký Google
  public async googleAuth(req: Request, res: Response) {
    try {
      const { googleId, name, email, avatarUrl } = req.body;
    console.log(googleId, name, email, avatarUrl);
      if (!googleId) {
        return res.status(400).json({ error: "Google ID missing" });
      }

      let user = await this.userRepository.findByGoogleId(googleId);

      if (!user) {
        const newUser = new User(
          0,
          name,
          email,
          undefined, // password
          googleId,
          "google",
          undefined,
          undefined,
          undefined,
          undefined,
          avatarUrl,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          0,
          undefined,
          false,
          true,
          "user",
          "free"
        );

        user = await this.userRepository.createGoogleUser(newUser);
      }

      return res.status(200).json({ user });
    } catch (err: any) {
      console.error("Google Auth error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
