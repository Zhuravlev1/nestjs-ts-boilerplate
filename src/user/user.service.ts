import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, LoginUserDto, UserDto } from './dto';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseCrudService } from '../shared/services/base-crud.service';
import { createHmac } from 'crypto';

@Injectable()
export class UserService extends BaseCrudService<UserEntity, UserDto, CreateUserDto, UpdateUserDto> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  async findByEmailAndPassword(loginUserDto: LoginUserDto): Promise<UserDto> {
    const encryptedPassword = createHmac('sha256', loginUserDto.password).digest('hex');
    const user = await this.repository.findOne({
      email: loginUserDto.email,
      password: encryptedPassword,
    }, { relations: ['tokens'] });
    return user ? this.buildDto(user) : null;
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: dto.email })
      .getOne();

    let errors;

    if (user) {
      errors = { username: 'Email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.createEntity(dto);

    errors = await validate(newUser);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.repository.save(newUser);
      return this.buildDto(savedUser);
    }
  }

  async findOrCreateByFacebookId(profile: any): Promise<UserDto> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.facebookId = :facebookId', { facebookId: profile.id })
      .getOne();

    if (user) {
      return this.buildDto(user);
    }

    const newUser = await this.createEntity({
      email: profile.email,
      lastName: profile.lastName,
      firstName: profile.firstName
    });

    const savedUser = await this.repository.save(newUser);
    return this.buildDto(savedUser);
  }

  protected buildDto(user: UserEntity): UserDto {
    return { ...user };
  }

  protected async createEntity(createDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    const {
      firstName,
      lastName,
      email,
      password,
    } = createDto;

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password ? password : null;

    return newUser;
  }
}
