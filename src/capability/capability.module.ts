import { Module } from '@nestjs/common';
import { CapabilityService } from './capability.service';
import { CapabilityController } from './capability.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Capabilities, CapabilitiesSchema } from './schema/capability.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Capabilities.name, schema: CapabilitiesSchema },
    ]),
  ],
  providers: [CapabilityService],
  controllers: [CapabilityController],
  exports: [CapabilityService],
})
export class CapabilityModule {}
