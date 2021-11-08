import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IConfigStatusService } from '../interfaces/implements/config-status.interface';
import { TStatusCheck } from '../interfaces/types/statusCheck.type';
import { TStatusUpdate } from '../interfaces/types/statusUpdate.type';
import { Status, StatusDocument } from '../schema/status.schema';

@Injectable()
export class ConfigStatusService implements IConfigStatusService {
  constructor(
    @InjectModel(Status.name) private readonly model: Model<StatusDocument>,
  ) {}

  async assign(params: TStatusUpdate): Promise<Status> {
    const { id, name } = params;
    return this.model.findByIdAndUpdate(
      id,
      {
        $push: { next: { name: name } },
      },
      { safe: true },
    );
  }

  async unassign(params: TStatusUpdate): Promise<Status> {
    const { id, name } = params;
    return this.model.findByIdAndUpdate(
      id,
      {
        $pull: { next: { name: name } },
      },
      { safe: true },
    );
  }

  async bulkUnassign(param: string): Promise<Status> {
    return this.model.findOneAndUpdate(
      { 'next.name': param },
      { $pull: { next: { name: param } } },
      { safe: true },
    );
  }

  async checkStatus(params: TStatusCheck): Promise<any> {
    const { currentStatus, newStatus } = params;

    return this.model.findOne({
      $and: [{ name: currentStatus }, { 'next.name': newStatus }],
    });
  }
}
