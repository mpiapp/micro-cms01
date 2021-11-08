import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCapabilitiesDTO {
  @ApiProperty()
  @Prop()
  name: string;
}
