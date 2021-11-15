import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentAddDTO } from './dto/payment.add.dto';
import { Payment, PaymentDocument } from './schema/payment.schema';

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment.name) private warehouseModel: Model<PaymentDocument>) {}

    async create(paymentTerm: PaymentAddDTO): Promise<Payment> {
        return this.warehouseModel.create(paymentTerm);
    }
}
