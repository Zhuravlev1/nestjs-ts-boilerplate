import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// const DEV = 'dev';

@Injectable()
export class UtilityService {
  get(key: string, throwOnMissing = true): string {
    const variable = process.env[key];
    if (!variable && throwOnMissing) {
      throw new Error(`Environment variable ${key} is undefined`);
    }
    return variable;
  }

  /*  static getDefaultEntityDir() {
      return process.env.NODE_ENV === DEV
        ? 'src/!**!/!**.entity{.ts,.js}'
        : 'dist/!**!/!**.entity{.ts,.js}';
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
        type: ORM_CONNECTION || 'mssql',
        host: ORM_HOST || 'localhost',
        port: +ORM_PORT || 1433,
        username: ORM_USERNAME || 'SA',
        password: ORM_PASSWORD || 'Thisist00much',
        database: ORM_DATABASE || 'amtpcms',
        entities: [ORM_ENTITIES || UtilityService.getDefaultEntityDir()],
        synchronize: ORM_SYNCHRONIZE || false,
        logging: ORM_LOGGING || true,
        migrations: [ORM_MIGRATIONS || 'dist/migrations/!*.js'],
        cli: {
          migrationsDir: ORM_MIGRATIONS_DIR || 'src/migrations',
        },
      };
    }*/
}
