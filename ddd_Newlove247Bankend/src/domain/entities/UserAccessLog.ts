import { AggregateRoot } from '../base/AggregateRoot';
import { UniqueEntityID } from '../base/UniqueEntityID';

export interface IUserAccessLogProps {
  userId?: string;
  ipAddress: string;
  userAgent?: string;
  endpoint: string;
  method: string;
  timestamp: Date;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
}

export class UserAccessLog extends AggregateRoot<IUserAccessLogProps> {
  get userId(): string | undefined {
    return this.props.userId;
  }

  get ipAddress(): string {
    return this.props.ipAddress;
  }

  get userAgent(): string | undefined {
    return this.props.userAgent;
  }

  get endpoint(): string {
    return this.props.endpoint;
  }

  get method(): string {
    return this.props.method;
  }

  get timestamp(): Date {
    return this.props.timestamp;
  }

  get country(): string | undefined {
    return this.props.country;
  }

  get city(): string | undefined {
    return this.props.city;
  }

  get region(): string | undefined {
    return this.props.region;
  }

  get timezone(): string | undefined {
    return this.props.timezone;
  }

  private constructor(props: IUserAccessLogProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IUserAccessLogProps): UserAccessLog {
    return new UserAccessLog({
      ...props,
      timestamp: props.timestamp || new Date()
    });
  }
}