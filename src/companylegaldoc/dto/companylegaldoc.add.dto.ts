import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { type } from "os";

export class CompanyLegalDocAddDTO {
    @IsNotEmpty()
    @ApiProperty()
    companyType: string;

    @IsNotEmpty()
    @ApiProperty()
    legalDoc: object[];
}