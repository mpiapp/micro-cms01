import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from './schema/status.schema';
import { ConfigStatusService } from './services/config-status.service';
import { MasterStatusService } from './services/master-status.service';
import { StatusController } from './status.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
  ],
  controllers: [StatusController],
  providers: [MasterStatusService, ConfigStatusService],
})
export class StatusModule {}
