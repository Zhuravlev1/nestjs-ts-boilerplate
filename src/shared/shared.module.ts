import { Module, Global } from '@nestjs/common';
import { ConfigService } from './util/configService.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
