import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type StatusDocument = Status & mongoose.Document;

@Schema({ timestamps: true })
export class Status {
  @Prop()
  id: string;
  @Prop({ unique: true, required: true, index: true, type: String })
  name: string;
  @Prop({
    type: [
      {
        name: { type: String },
      },
    ],
  })
  next: {
    name: string;
  }[];
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
