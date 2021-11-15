import { ApiProperty } from "@nestjs/swagger";

export class PaymentDeleteDTO {
    @ApiProperty()
    _id: string;

    deletedAt: Date;
}