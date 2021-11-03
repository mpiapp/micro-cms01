import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, Validate } from 'class-validator';
import { FeaturesMongoIdRule } from '../../custom-validator/custom-validator';

export class UpdateNavigationDTO {
  @ApiProperty()
  @Prop()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @Prop()
  @IsOptional()
  link?: string;

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  @IsOptional()
  flag?: string;

  @ApiProperty()
  @Prop()
  @Validate(FeaturesMongoIdRule)
  @IsOptional()
  feature_ids?: string[];
}
