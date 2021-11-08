import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsOptional, Validate } from 'class-validator';
import { FeaturesMongoIdRule } from '../../custom-validator/custom-validator';

export class CreateNavigationDTO {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  link: string;

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  flag: string;

  @ApiProperty()
  @Prop()
  @Validate(FeaturesMongoIdRule)
  feature_ids?: string[];
}
