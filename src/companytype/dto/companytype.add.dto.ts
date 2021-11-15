import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CompanyTypeAddDTO {
    @IsNotEmpty()
    @ApiProperty()
    companyType: string;
}