import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type FeatureDocument = Feature & Document;

@Schema()
export class Feature {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  capability_ids?: string[];

  @ApiProperty()
  @Prop()
  flag: string;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
