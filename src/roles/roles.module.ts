import { Module as ModulesNest } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CapabilityService } from '../capability/capability.service';
import {
  Capabilities,
  CapabilitiesSchema,
} from '../capability/schema/capability.schema';
import { FeatureService } from 'src/feature/feature.service';
import { Feature, FeatureSchema } from 'src/feature/schema/feature.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role, RoleSchema } from './schema/roles.schema';
import { NavigationService } from '../navigation/navigation.service';
import { Module, ModuleSchema } from '../navigation/schema/navigation.schema';

@ModulesNest({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Module.name, schema: ModuleSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: Capabilities.name, schema: CapabilitiesSchema },
    ]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    NavigationService,
    FeatureService,
    CapabilityService,
  ],
})
export class RolesModule {}
