import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../shared';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { TokenEntity } from '../token/token.entity';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: Repository,
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useValue: Repository,
        },
      ],
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
