export class Friendship {
  constructor(
    public readonly id: number,
    public requesterId: number,     // user gửi lời mời
    public addresseeId: number,    // user nhận lời mời
    public status: 'pending' | 'accepted' | 'blocked', // trạng thái
    public createdAt: Date
  ) {}
}
