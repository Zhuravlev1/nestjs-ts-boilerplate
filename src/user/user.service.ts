import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, UserDto } from './dto';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseCrudService } from '../shared/services/base-crud.service';

@Injectable()
export class UserService extends BaseCrudService<UserEntity, UserDto, CreateUserDto, UpdateUserDto> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super();
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

  protected buildDto(user: UserEntity): UserDto {
    delete user.password;
    return {...user};
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
    newUser.password = password;

    return newUser;
  }
}
