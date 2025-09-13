export class Event {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public type: 'speed_dating' | 'picnic' | 'workshop' | 'party',
    public location: string,
    public startTime: Date,
    public endTime: Date,
    public createdBy: number // userId
  ) {}
}
