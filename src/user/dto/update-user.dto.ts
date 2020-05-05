import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastName: string;
}
