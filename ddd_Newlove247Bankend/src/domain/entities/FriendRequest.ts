export class FriendRequest {
  constructor(
    public id: number,
    public senderId: number,
    public receiverId: number,
    public status: "pending" | "accepted" | "rejected" = "pending",
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
