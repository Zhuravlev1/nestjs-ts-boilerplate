import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: // new Date().toISOString()
    };
    try {
      return healthCheck;
    } catch (e) {
      healthCheck.message = e;
      return healthCheck;
    }
  }
}
