export class Message {
  constructor(
    public readonly id: number,
    public conversationId: number,
    public senderId: number,
    public content: string,
    public sentAt: Date,
    public isRead: boolean
  ) {}
}
