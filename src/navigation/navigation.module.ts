import { Module as ModulesNest } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CapabilityService } from 'src/capability/capability.service';
import {
  Capabilities,
  CapabilitiesSchema,
} from 'src/capability/schema/capability.schema';
import { FeatureService } from 'src/feature/feature.service';
import { Feature, FeatureSchema } from 'src/feature/schema/feature.schema';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { Module, ModuleSchema } from './schema/navigation.schema';

@ModulesNest({
  imports: [
    MongooseModule.forFeature([
      { name: Module.name, schema: ModuleSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: Capabilities.name, schema: CapabilitiesSchema },
    ]),
  ],
  controllers: [NavigationController],
  providers: [NavigationService, FeatureService, CapabilityService],
  exports: [NavigationService],
})
export class NavigationModule {}
