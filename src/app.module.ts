import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './shared';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getOrmConfig() as any),
    SharedModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  // private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly configService: ConfigService,
  ) {
    const port = this.configService.getEnvVariable('PORT', false) || '3000';
    AppModule.port = parseInt(port, 10);
  }
}
