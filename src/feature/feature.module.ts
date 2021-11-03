import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CapabilityService } from '../capability/capability.service';
import {
  Capabilities,
  CapabilitiesSchema,
} from '../capability/schema/capability.schema';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';
import { Feature, FeatureSchema } from './schema/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
      { name: Capabilities.name, schema: CapabilitiesSchema },
    ]),
  ],
  controllers: [FeatureController],
  providers: [FeatureService, CapabilityService],
  exports: [FeatureService],
})
export class FeatureModule {}
