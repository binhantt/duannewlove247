import { Request, Response } from 'express';
import { UserAccessTrackingService } from '../../../application/services/UserAccessTrackingService';

export class AnalyticsController {
  constructor(private trackingService: UserAccessTrackingService) {}

  async getSystemAnalytics(req: Request, res: Response) {
    try {
      const analytics = await this.trackingService.getSystemAnalytics();
      
      res.json({
        success: true,
        data: analytics,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getUserAccessHistory(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const limit = parseInt(req.query.limit as string) || 50;
      
      const history = await this.trackingService.getUserAccessHistory(userId, limit);
      
      res.json({
        success: true,
        data: history,
        count: history.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}