import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../shared';

export class UserDto extends BaseDto{
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;
}
