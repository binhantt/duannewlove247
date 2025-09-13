export class MiniGame {
  constructor(
    public readonly id: number,
    public name: string,
    public type: 'quiz' | 'speed_date' | 'other',
    public rules: string
  ) {}
}
