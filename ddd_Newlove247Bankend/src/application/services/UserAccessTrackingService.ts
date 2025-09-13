import { UserAccessLog } from '../../domain/entities/UserAccessLog';
import { IUserAccessLogRepository } from '../../domain/repositories/IUserAccessLogRepository';
import { IGeoLocationService } from '../interfaces/IGeoLocationService';

export interface ILogUserAccessRequest {
  userId?: string;
  ipAddress: string;
  userAgent?: string;
  endpoint: string;
  method: string;
}

export class UserAccessTrackingService {
  constructor(
    private userAccessLogRepository: IUserAccessLogRepository,
    private geoLocationService: IGeoLocationService
  ) {}

  async logUserAccess(request: ILogUserAccessRequest): Promise<void> {
    try {
      // Get geolocation data
      const geoData = await this.geoLocationService.getLocationByIP(request.ipAddress);
      
      const accessLog = UserAccessLog.create({
        ...request,
        country: geoData?.country,
        city: geoData?.city,
        region: geoData?.region,
        timezone: geoData?.timezone
      });

      await this.userAccessLogRepository.save(accessLog);
      
      // Log to console for immediate visibility
      console.log(`📍 IP Access: ${request.ipAddress} | ${request.method} ${request.endpoint} | User: ${request.userId || 'anonymous'} | Location: ${geoData?.city || 'unknown'}`);
    } catch (error) {
      console.error('Error logging user access:', error);
    }
  }

  async getUserAccessHistory(userId: string, limit: number = 50): Promise<UserAccessLog[]> {
    return this.userAccessLogRepository.findByUserId(userId, limit);
  }

  async getSystemAnalytics() {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [uniqueVisitors24h, uniqueVisitors7d, topEndpoints, dailyCounts] = await Promise.all([
      this.userAccessLogRepository.getUniqueVisitorsCount(last24Hours, now),
      this.userAccessLogRepository.getUniqueVisitorsCount(last7Days, now),
      this.userAccessLogRepository.getTopEndpoints(10),
      this.userAccessLogRepository.getDailyAccessCounts(last7Days, now)
    ]);

    return {
      uniqueVisitors24h,
      uniqueVisitors7d,
      topEndpoints,
      dailyCounts
    };
  }
}