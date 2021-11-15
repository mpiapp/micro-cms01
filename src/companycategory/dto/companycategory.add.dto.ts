import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CompanyCategoryAddDTO {
    @IsNotEmpty()
    @ApiProperty()
    category: string;
}