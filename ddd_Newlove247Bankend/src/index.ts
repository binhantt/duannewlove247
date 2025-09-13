import app from './interfaces/http/app';
import { appConfig } from './infrastructure/config/app.config';
import { UserAccessLogRepository } from './infrastructure/database/repositories/UserAccessLogRepository';
import { GeoLocationService } from './infrastructure/services/GeoLocationService';
import { UserAccessTrackingService } from './application/services/UserAccessTrackingService';


// Initialize IP tracking service
const userAccessLogRepository = new UserAccessLogRepository();
const geoLocationService = new GeoLocationService();
const trackingService = new UserAccessTrackingService(userAccessLogRepository, geoLocationService);

// Create IP tracking middleware


// Apply middleware to track all requests

// Start server
const server = app.listen(appConfig.port, () => {
  console.log(`🚀 Server is running on port ${appConfig.port}`);
  console.log(`📊 IP Tracking is active - monitoring all incoming requests`);
 
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

// Export for testing
export default server;