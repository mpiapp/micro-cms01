import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  module_ids: string[];

  @ApiProperty()
  @Prop()
  @IsIn(['BUYER', 'VENDOR'])
  flag: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
