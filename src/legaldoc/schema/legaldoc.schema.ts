import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class LegalDoc {
    _id: string;

    @Prop({unique: true, index: true})
    name: string;

    @Prop()
    title: string;

    @Prop({default: null})
    deletedAt: Date;
}

export const LegalDocSchema = SchemaFactory.createForClass(LegalDoc);
export type LegalDocDocument = LegalDoc & Document;