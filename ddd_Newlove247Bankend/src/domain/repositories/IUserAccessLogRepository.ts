import { UserAccessLog } from '../entities/UserAccessLog';

export interface IUserAccessLogRepository {
  save(accessLog: UserAccessLog): Promise<void>;
  findByIpAddress(ipAddress: string, limit?: number): Promise<UserAccessLog[]>;
  findByUserId(userId: string, limit?: number): Promise<UserAccessLog[]>;
  getUniqueVisitorsCount(startDate: Date, endDate: Date): Promise<number>;
  getTopEndpoints(limit: number): Promise<{ endpoint: string; count: number }[]>;
  getDailyAccessCounts(startDate: Date, endDate: Date): Promise<{ date: string; count: number }[]>;
}