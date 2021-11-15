import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentAddDTO } from './dto/payment.add.dto';
import { PaymentService } from './payment.service';
import { Payment } from './schema/payment.schema';

@ApiTags('Payment Term Module')
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @Post()
    async create(@Body() paymentTerm: PaymentAddDTO): Promise<Payment> {
        return this.paymentService.create(paymentTerm);
    }
}