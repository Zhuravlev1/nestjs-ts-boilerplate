import { ConfigService } from './src/shared';
import * as fs from 'fs';

fs.writeFileSync(
  `ormconfig.json`,
  JSON.stringify(ConfigService.getOrmConfig(), null, 2),
);
