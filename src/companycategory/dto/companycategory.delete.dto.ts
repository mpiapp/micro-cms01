import { ApiProperty } from "@nestjs/swagger";

export class CompanyCategoryDeleteDTO {
    @ApiProperty()
    _id: string;

    deletedAt: Date;
}