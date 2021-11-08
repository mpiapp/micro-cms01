import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, Validate } from 'class-validator';
import { FeaturesMongoIdRule } from '../../custom-validator/custom-validator';

export class UpdateRoleDepDTO {
  @ApiProperty()
  @Prop()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @Prop()
  @Validate(FeaturesMongoIdRule)
  @IsOptional()
  module_ids?: string[];

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  @IsOptional()
  flag?: string;
}
