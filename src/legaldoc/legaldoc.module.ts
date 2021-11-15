import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LegalDocService } from './legaldoc.service';
import { LegalDoc, LegalDocSchema } from './schema/legaldoc.schema';
import { LegalDocController } from './legaldoc.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LegalDoc.name, schema: LegalDocSchema },
    ]),
  ],
  providers: [LegalDocService],
  controllers: [LegalDocController]
})
export class LegalDocModule {}
