import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CapabilitiesDocument = Capabilities & Document;

@Schema()
export class Capabilities {
  @ApiProperty()
  @Prop()
  name: string;
}

export const CapabilitiesSchema = SchemaFactory.createForClass(Capabilities);
