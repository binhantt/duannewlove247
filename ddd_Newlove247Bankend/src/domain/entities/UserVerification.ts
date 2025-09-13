export class UserVerification {
  constructor(
    public id: number,
    public userId: number,
    public type: "email" | "google" | "phone",
    public token: string,
    public isVerified: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
