import { ApiProperty } from "@nestjs/swagger";

export class LegalDocDeleteDTO {
    @ApiProperty()
    _id: string;

    deletedAt: Date;
}