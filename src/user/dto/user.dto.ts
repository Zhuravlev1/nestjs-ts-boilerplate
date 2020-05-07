import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../shared';
import { TokenEntity } from '../../token/token.entity';

export class UserDto extends BaseDto{
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  tokens?: TokenEntity[];
}
