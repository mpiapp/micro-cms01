import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CompanyTypeEditDTO {
    @IsNotEmpty()
    @ApiProperty()
    _id: string;

    @IsNotEmpty()
    @ApiProperty()
    companyType: string;
}