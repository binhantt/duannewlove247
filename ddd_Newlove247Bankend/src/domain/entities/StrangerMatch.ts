export class StrangerMatch {
  constructor(
    public readonly id: number,
    public userAId: number,
    public userBId: number,
    public matchedAt: Date,
    public status: 'active' | 'ended'
  ) {}
}
