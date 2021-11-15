import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentAddDTO } from './dto/payment.add.dto';
import { PaymentDeleteDTO } from './dto/payment.delete.dto';
import { PaymentEditDTO } from './dto/payment.edit.dto';
import { PaymentService } from './payment.service';
import { Payment } from './schema/payment.schema';

@ApiTags('Payment Term Module')
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @Get()
    async getAll(): Promise<Payment[]> {
        return this.paymentService.getAll();
    }
    
    @Post()
    async create(@Body() paymentTerm: PaymentAddDTO): Promise<Payment> {
        return this.paymentService.create(paymentTerm);
    }

    @Put()
    async update(@Body() paymentTerm: PaymentEditDTO): Promise<Payment> {
        return this.paymentService.edit(paymentTerm);
    }

    @Delete()
    async delete(@Body() paymentTerm: PaymentDeleteDTO): Promise<Payment> {
        paymentTerm.deletedAt = new Date;
        return this.paymentService.delete(paymentTerm);
    }
}