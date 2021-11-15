import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class PaymentAddDTO {
    @IsNotEmpty()
    @ApiProperty()
    paymentTerm: string;
}