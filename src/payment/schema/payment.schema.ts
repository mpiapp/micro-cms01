import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class Payment {
    _id: string;

    @Prop({unique: true, index: true})
    paymentTerm: string;

    @Prop({default: null})
    deletedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
export type PaymentDocument = Payment & Document;