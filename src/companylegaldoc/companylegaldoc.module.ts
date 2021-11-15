import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyLegalDocService } from './companylegaldoc.service';
import { CompanyLegalDoc, CompanyLegalDocSchema } from './schema/companylegaldoc.schema';
import { CompanyLegalDocController } from './companylegaldoc.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyLegalDoc.name, schema: CompanyLegalDocSchema },
    ]),
  ],
  providers: [CompanyLegalDocService],
  controllers: [CompanyLegalDocController]
})
export class CompanyLegalDocModule {}
