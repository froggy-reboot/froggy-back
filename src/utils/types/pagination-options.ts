import { ApiProperty } from '@nestjs/swagger';

export class IPaginationOptions {
  @ApiProperty({ example: 1 })
  page: number;
  @ApiProperty({ example: 5 })
  limit: number;
}
