import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { StatusCreateParmDto } from './statusCreate.dto';

export class StatusUnOrAssignParmDto extends StatusCreateParmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
