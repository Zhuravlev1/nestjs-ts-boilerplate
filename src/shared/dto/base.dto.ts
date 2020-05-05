import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}