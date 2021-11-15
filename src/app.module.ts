import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureModule } from './feature/feature.module';
import { NavigationModule } from './navigation/navigation.module';
import { CustomValidatorModule } from './custom-validator/custom-validator.module';
import { CapabilityModule } from './capability/capability.module';
import { StatusModule } from './status/status.module';
import { PaymentModule } from './payment/payment.module';
import * as dotenv from 'dotenv';
import { CompanyTypeModule } from './companytype/companytype.module';
import { CompanyCategoryModule } from './companycategory/companycategory.module';
import { LegalDocModule } from './legaldoc/legaldoc.module';
import { CompanyLegalDocModule } from './companylegaldoc/companylegaldoc.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@dev-cluster-pasarpemesa.wv4wg.mongodb.net/b2b_cms?authSource=admin&replicaSet=atlas-11zyru-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
    ),
    RolesModule,
    FeatureModule,
    NavigationModule,
    CustomValidatorModule,
    CapabilityModule,
    StatusModule,
    PaymentModule,
    CompanyTypeModule,
    CompanyCategoryModule,
    LegalDocModule,
    CompanyLegalDocModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
