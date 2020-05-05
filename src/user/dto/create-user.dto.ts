import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
