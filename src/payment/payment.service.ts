import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentAddDTO } from './dto/payment.add.dto';
import { PaymentDeleteDTO } from './dto/payment.delete.dto';
import { PaymentEditDTO } from './dto/payment.edit.dto';
import { Payment, PaymentDocument } from './schema/payment.schema';

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment.name) private paymentTermModel: Model<PaymentDocument>) {}

    async create(paymentTerm: PaymentAddDTO): Promise<Payment> {
        return this.paymentTermModel.create(paymentTerm);
    }

    async edit(paymentTerm: PaymentEditDTO): Promise<Payment> {
        return await this.paymentTermModel.findOneAndUpdate({_id: paymentTerm._id}, paymentTerm, { new: true , useFindAndModify: false});
    }

    async delete(paymentTerm: PaymentDeleteDTO) {
        return await this.paymentTermModel.findOneAndUpdate({ _id : paymentTerm._id, deletedAt: { "$eq": null } }, paymentTerm, { new: true , useFindAndModify: false});
    }

    async getAll(): Promise<Payment[]> {
        return await this.paymentTermModel.find({ deletedAt: { "$eq": null } });
    }
}
