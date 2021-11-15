import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCategoryService } from './companycategory.service';
import { CompanyCategory, CompanyCategorySchema } from './schema/companycategory.schema';
import { CompanyCategoryController } from './companycategory.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyCategory.name, schema: CompanyCategorySchema },
    ]),
  ],
  providers: [CompanyCategoryService],
  controllers: [CompanyCategoryController]
})
export class CompanyCategoryModule {}
