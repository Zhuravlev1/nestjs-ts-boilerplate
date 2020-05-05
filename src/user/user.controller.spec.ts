import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EntityManager, Repository } from 'typeorm';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, UserDto } from './dto';
import { ConfigService } from '../shared';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        ConfigService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: Repository,
        },
        {
          provide: getEntityManagerToken(),
          useValue: EntityManager,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('check methods', () => {
    const fakeUserData: UserDto = {
      id: 99999,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: 'test@gmail.com',
      firstName: 'Jon',
      lastName: 'Snow'
    };


    it('create', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(Promise.resolve(fakeUserData));
      const createUserDto: CreateUserDto = {
        email: 'test@gmail.com',
        firstName: 'Jon',
        lastName: 'Snow',
        password: '123456',
      };

      expect(await controller.create(createUserDto)).toBe(fakeUserData);
    });
  });

  describe('check instance', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
