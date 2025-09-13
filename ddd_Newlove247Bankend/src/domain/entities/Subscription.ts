export class Subscription {
  constructor(
    public readonly id: number,
    public userId: number,
    public plan: 'free' | 'premium' | 'vip',
    public startDate: Date,
    public endDate: Date
  ) {}
}
