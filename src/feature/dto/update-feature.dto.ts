import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, Validate } from 'class-validator';
import { FeaturesMongoIdRule } from '../../custom-validator/custom-validator';

export class UpdateFeatureDTO {
  @ApiProperty()
  @Prop()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @Prop()
  @Validate(FeaturesMongoIdRule)
  @IsOptional()
  capability_ids?: any[];

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  @IsOptional()
  flag?: string;
}
