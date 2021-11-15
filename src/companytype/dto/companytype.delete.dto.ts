import { ApiProperty } from "@nestjs/swagger";

export class CompanyTypeDeleteDTO {
    @ApiProperty()
    _id: string;

    deletedAt: Date;
}