import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PagingMetaDto } from "src/dto/paging";

export class PagingDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PagingMetaDto })
  readonly meta: PagingMetaDto;

  constructor(data: T[], meta: PagingMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
