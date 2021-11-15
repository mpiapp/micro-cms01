import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class LegalDocEditDTO {
    @IsNotEmpty()
    @ApiProperty()
    _id: string;

    @IsNotEmpty()
    @ApiProperty()
    title: string;
}