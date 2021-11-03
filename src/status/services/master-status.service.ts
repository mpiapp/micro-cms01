import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMasterStatusService } from '../interfaces/implements/master-status.interface';
import { TStatus } from '../interfaces/types/statusCreate.type';
import { Status, StatusDocument } from '../schema/status.schema';

@Injectable()
export class MasterStatusService implements IMasterStatusService {
  constructor(
    @InjectModel(Status.name) private readonly model: Model<StatusDocument>,
  ) {}

  async save(param: TStatus): Promise<Status> {
    return this.model.create(param);
  }
}
