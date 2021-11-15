import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class CompanyType {
    _id: string;

    @Prop({unique: true, index: true})
    companyType: string;

    @Prop({default: null})
    deletedAt: Date;
}

export const CompanyTypeSchema = SchemaFactory.createForClass(CompanyType);
export type CompanyTypeDocument = CompanyType & Document;