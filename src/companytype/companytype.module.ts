import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyTypeService } from './companytype.service';
import { CompanyType, CompanyTypeSchema } from './schema/companytype.schema';
import { CompanyTypeController } from './companytype.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyType.name, schema: CompanyTypeSchema },
    ]),
  ],
  providers: [CompanyTypeService],
  controllers: [CompanyTypeController]
})
export class CompanyTypeModule {}
