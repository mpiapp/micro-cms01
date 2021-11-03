import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateRoleDTO {
  @ApiProperty()
  @Prop()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  @IsOptional()
  flag?: string;
}
