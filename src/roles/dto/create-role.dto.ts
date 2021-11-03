import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsOptional } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  flag: string;
}
