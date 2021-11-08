import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsOptional, Validate } from 'class-validator';
import { FeaturesMongoIdRule } from '../../custom-validator/custom-validator';

export class CreateFeatureDTO {
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
  capability_ids?: any[];

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  flag: string;
}
