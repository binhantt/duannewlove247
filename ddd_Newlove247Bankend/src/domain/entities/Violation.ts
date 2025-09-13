export class Violation {
  constructor(
    public id: number,
    public userId: number,
    public reason: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
