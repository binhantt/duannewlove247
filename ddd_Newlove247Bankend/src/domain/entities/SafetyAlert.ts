export class SafetyAlert {
  constructor(
    public readonly id: number,
    public userId: number,
    public location: string,
    public message: string,
    public createdAt: Date
  ) {}
}
