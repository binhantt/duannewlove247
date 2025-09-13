import { UserAccessLog } from '../../../domain/entities/UserAccessLog';
import { IUserAccessLogRepository } from '../../../domain/repositories/IUserAccessLogRepository';

interface UserAccessLogDocument {
  _id?: string;
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

export class UserAccessLogRepository implements IUserAccessLogRepository {
  // For simplicity, using in-memory storage - replace with MongoDB/PostgreSQL
  private logs: UserAccessLogDocument[] = [];

  async save(accessLog: UserAccessLog): Promise<void> {
    const log: UserAccessLogDocument = {
      userId: accessLog.userId,
      ipAddress: accessLog.ipAddress,
      userAgent: accessLog.userAgent,
      endpoint: accessLog.endpoint,
      method: accessLog.method,
      timestamp: accessLog.timestamp,
      country: accessLog.country,
      city: accessLog.city,
      region: accessLog.region,
      timezone: accessLog.timezone
    };
    
    this.logs.push(log);
  }

  async findByIpAddress(ipAddress: string, limit: number = 50): Promise<UserAccessLog[]> {
    const filtered = this.logs
      .filter(log => log.ipAddress === ipAddress)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
    
    return filtered.map(this.mapToDomain);
  }

  async findByUserId(userId: string, limit: number = 50): Promise<UserAccessLog[]> {
    const filtered = this.logs
      .filter(log => log.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
    
    return filtered.map(this.mapToDomain);
  }

  async getUniqueVisitorsCount(startDate: Date, endDate: Date): Promise<number> {
    const uniqueIPs = new Set(
      this.logs
        .filter(log => log.timestamp >= startDate && log.timestamp <= endDate)
        .map(log => log.ipAddress)
    );
    
    return uniqueIPs.size;
  }

  async getTopEndpoints(limit: number): Promise<{ endpoint: string; count: number }[]> {
    const endpointCounts = new Map<string, number>();
    
    this.logs.forEach(log => {
      const key = `${log.method} ${log.endpoint}`;
      endpointCounts.set(key, (endpointCounts.get(key) || 0) + 1);
    });

    return Array.from(endpointCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([endpoint, count]) => ({ endpoint, count }));
  }

  async getDailyAccessCounts(startDate: Date, endDate: Date): Promise<{ date: string; count: number }[]> {
    const dailyCounts = new Map<string, number>();
    
    this.logs
      .filter(log => log.timestamp >= startDate && log.timestamp <= endDate)
      .forEach(log => {
        const date = log.timestamp.toISOString().split('T')[0];
        dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
      });

    return Array.from(dailyCounts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));
  }

  private mapToDomain(doc: UserAccessLogDocument): UserAccessLog {
    return UserAccessLog.create({
      userId: doc.userId,
      ipAddress: doc.ipAddress,
      userAgent: doc.userAgent,
      endpoint: doc.endpoint,
      method: doc.method,
      timestamp: doc.timestamp,
      country: doc.country,
      city: doc.city,
      region: doc.region,
      timezone: doc.timezone
    });
  }
}