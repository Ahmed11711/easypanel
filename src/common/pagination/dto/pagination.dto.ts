import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty()
  limit?: number = 10;
}
