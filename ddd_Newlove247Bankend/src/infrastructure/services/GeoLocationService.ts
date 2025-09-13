import axios from 'axios';
import { IGeoLocationService } from '../../application/interfaces/IGeoLocationService';

export interface GeoLocationData {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

export class GeoLocationService implements IGeoLocationService {
  private readonly apiUrl = 'http://ip-api.com/json';

  async getLocationByIP(ipAddress: string): Promise<GeoLocationData | null> {
    try {
      // Skip private/local IPs
      if (this.isPrivateIP(ipAddress)) {
        return null;
      }

      const response = await axios.get(`${this.apiUrl}/${ipAddress}`, {
        timeout: 3000
      });

      if (response.data.status === 'success') {
        return response.data;
      }

      return null;
    } catch (error) {
      console.warn(`Failed to get geolocation for IP ${ipAddress}:`, error.message);
      return null;
    }
  }

  private isPrivateIP(ip: string): boolean {
    const privateRanges = [
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^::1$/,
      /^fc00:/,
      /^fe80:/
    ];
    
    return privateRanges.some(range => range.test(ip));
  }
}