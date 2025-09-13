export abstract class AggregateRoot<T> {
  protected readonly props: T;
  protected _id: any;

  constructor(props: T, id?: any) {
    this.props = props;
    this._id = id;
  }

  get id(): any {
    return this._id;
  }
}