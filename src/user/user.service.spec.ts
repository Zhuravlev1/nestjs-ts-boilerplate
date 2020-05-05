import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('check instance', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
