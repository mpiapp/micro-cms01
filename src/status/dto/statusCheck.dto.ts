import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StatusCheckParmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentStatus: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newStatus: string;
}
