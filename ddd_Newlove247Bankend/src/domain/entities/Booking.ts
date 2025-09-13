export class Booking {
  constructor(
    public readonly id: number,
    public userId: number,
    public venueId: number,
    public bookingTime: Date,
    public status: 'pending' | 'confirmed' | 'cancelled'
  ) {}
}
