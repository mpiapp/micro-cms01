import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CompanyCategoryEditDTO {
    @IsNotEmpty()
    @ApiProperty()
    _id: string;

    @IsNotEmpty()
    @ApiProperty()
    category: string;
}