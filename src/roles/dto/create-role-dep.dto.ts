import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsOptional, Validate } from 'class-validator';
import { FeaturesMongoIdRule } from '../../custom-validator/custom-validator';

export class CreateRoleDepDTO {
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
  @Validate(FeaturesMongoIdRule)
  module_ids: string[];

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  flag: string;
}
