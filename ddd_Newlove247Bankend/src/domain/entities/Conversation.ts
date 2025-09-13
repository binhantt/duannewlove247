export class Conversation {
  constructor(
    public readonly id: number,
    public type: 'private' | 'group' | 'stranger', // loại chat
    public participantIds: number[], // danh sách userId tham gia
    public createdAt: Date
  ) {}
}
