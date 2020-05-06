import { ConfigService } from '../shared';

const configService = new ConfigService();
const JWT_SECRET = configService.getEnvVariable('JWT_SECRET', false);
const JWT_EXPIRES_IN = parseInt(configService.getEnvVariable('JWT_EXPIRES_IN', false));
const JWT_REFRESH_EXPIRES_IN = configService.getEnvVariable('JWT_REFRESH_EXPIRES_IN', false);

export const jwtConstants = {
  secret: JWT_SECRET ? JWT_SECRET : 'secret-key',
  expiresIn: JWT_EXPIRES_IN ? JWT_EXPIRES_IN : 43200,
  refreshTokenExpiresIn: JWT_REFRESH_EXPIRES_IN
    ? JWT_REFRESH_EXPIRES_IN
    : 46800,
};
