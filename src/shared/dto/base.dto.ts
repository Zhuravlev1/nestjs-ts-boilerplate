import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}