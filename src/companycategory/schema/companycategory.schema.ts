import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class CompanyCategory {
    _id: string;

    @Prop({unique: true, index: true})
    category: string;

    @Prop({default: null})
    deletedAt: Date;
}

export const CompanyCategorySchema = SchemaFactory.createForClass(CompanyCategory);
export type CompanyCategoryDocument = CompanyCategory & Document;