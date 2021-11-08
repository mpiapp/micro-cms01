import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ModuleDocument = Module & Document;

@Schema()
export class Module {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  link: string;

  @ApiProperty()
  @Prop()
  flag: string;

  @ApiProperty()
  @Prop()
  feature_ids?: string[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
