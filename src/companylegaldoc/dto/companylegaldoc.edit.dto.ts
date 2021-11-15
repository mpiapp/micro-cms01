import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { type } from "os";

export class CompanyLegalDocEditDTO {
    @IsNotEmpty()
    @ApiProperty()
    _id: string;

    @IsNotEmpty()
    @ApiProperty()
    companyType: string;

    @IsNotEmpty()
    @ApiProperty()
    legalDoc: object[];
}