import { ApiProperty } from "@nestjs/swagger";

export class CompanyLegalDocDeleteDTO {
    @ApiProperty()
    _id: string;

    deletedAt: Date;
}