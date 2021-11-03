import { Module } from '@nestjs/common';
import { FeatureModule } from '../feature/feature.module';

@Module({})
export class CustomValidatorModule {
  imports: [FeatureModule];
}
