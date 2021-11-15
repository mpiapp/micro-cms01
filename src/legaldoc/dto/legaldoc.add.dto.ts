import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class LegalDocAddDTO {
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    name: string;
}