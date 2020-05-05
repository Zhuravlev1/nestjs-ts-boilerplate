import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, UserDto } from './dto';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserDto> {
    const { email, firstName, lastName } = dto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();

    let errors;

    if (user) {
      errors = { username: 'Email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = dto.password;

    errors = await validate(newUser);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildDto(savedUser);
    }
  }

  buildDto(user: UserEntity): UserDto {
    delete user.password;
    return {...user};
  }
}
