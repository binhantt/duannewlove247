export class Venue {
  constructor(
    public readonly id: number,
    public name: string,
    public type: 'cafe' | 'restaurant' | 'bar' | 'theater' | 'park' | 'other',
    public location: string,
    public avgPrice: number,
    public description: string,
    public rating: number,
    public isPartner: boolean
  ) {}
}
