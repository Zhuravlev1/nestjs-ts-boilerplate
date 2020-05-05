import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional } from 'class-validator';

export class SearchDto {
  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  skip?: number;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  take?: number;

  @ApiProperty()
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  orderDirection?: 'ASC' | 'DESC';
}
