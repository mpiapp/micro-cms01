import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class CreateCapabilitiesDTO {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty()
  @Prop()
  name: string;
}
