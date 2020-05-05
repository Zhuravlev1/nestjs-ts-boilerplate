import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NodeEnv } from './nodeEnv';

dotenv.config({ path: '.env' });

@Injectable()
export class ConfigService {
  getEnvVariable(key: string, throwOnMissing: boolean = true): string {
    const variable = process.env[key];
    if (!variable && throwOnMissing) {
      throw new Error(`Environment variable ${key} is undefined`);
    }
    return variable;
  }

  isProduction() {
    const mode = this.getEnvVariable('NODE_ENV');
    return mode !== NodeEnv.dev;
  }

  static getDefaultEntityDir() {
    return process.env.NODE_ENV === NodeEnv.dev
      ? 'src/**/**.entity{.ts,.js}'
      : 'dist/!**/!**.entity{.ts,.js}';
  }

  static getOrmConfig() {
    const {
      ORM_CONNECTION,
      ORM_HOST,
      ORM_PORT,
      ORM_USERNAME,
      ORM_PASSWORD,
      ORM_DATABASE,
      ORM_SYNCHRONIZE,
      ORM_LOGGING,
      ORM_ENTITIES,
      ORM_MIGRATIONS,
      ORM_MIGRATIONS_DIR,
    } = process.env;

    return {
      type: ORM_CONNECTION || 'postgres',
      host: ORM_HOST || 'localhost',
      port: +ORM_PORT || 5432,
      username: ORM_USERNAME || 'admin',
      password: ORM_PASSWORD || 'admin',
      database: ORM_DATABASE || 'postgres',
      entities: [ORM_ENTITIES || ConfigService.getDefaultEntityDir()],
      synchronize: ORM_SYNCHRONIZE || false,
      logging: ORM_LOGGING || true,
      migrations: [ORM_MIGRATIONS || 'dist/migrations/!*.js'],
      cli: {
        migrationsDir: ORM_MIGRATIONS_DIR || 'src/migrations',
      },
    };
  }
}
