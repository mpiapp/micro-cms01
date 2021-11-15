import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class PaymentEditDTO {
    @IsNotEmpty()
    @ApiProperty()
    _id: string;

    @IsNotEmpty()
    @ApiProperty()
    paymentTerm: string;
}