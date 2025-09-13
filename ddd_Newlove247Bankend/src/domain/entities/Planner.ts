export class Planner {
  constructor(
    public readonly id: number,
    public userId: number,
    public budget: number,
    public availableAt: Date,
    public seriousness: 'casual' | 'normal' | 'serious',
    public preference: string[],
    public suggestedPlan: any // JSON -> có thể map sang Value Object riêng
  ) {}
}
