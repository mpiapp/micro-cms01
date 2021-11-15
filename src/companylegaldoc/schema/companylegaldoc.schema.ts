import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class CompanyLegalDoc {
    _id: string;

    @Prop({unique: true, index: true})
    companyType: string;

    @Prop()
    legalDoc: object[];

    @Prop({default: null})
    deletedAt: Date;
}

export const CompanyLegalDocSchema = SchemaFactory.createForClass(CompanyLegalDoc);
export type CompanyLegalDocDocument = CompanyLegalDoc & Document;