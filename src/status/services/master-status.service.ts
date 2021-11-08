import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMasterStatusService } from '../interfaces/implements/master-status.interface';
import { TStatus } from '../interfaces/types/statusCreate.type';
import { TStatusPaginate } from '../interfaces/types/statusPaginate.type';
import { Status, StatusDocument } from '../schema/status.schema';

@Injectable()
export class MasterStatusService implements IMasterStatusService {
  constructor(
    @InjectModel(Status.name) private readonly model: Model<StatusDocument>,
  ) {}

  async save(param: TStatus): Promise<Status> {
    return this.model.create(param);
  }

  async getOne(id: string): Promise<Status> {
    return this.model.findById(id);
  }

  async getAll(): Promise<Status[]> {
    return this.model.find({ isDeleted: false });
  }

  async getPaginate(params: TStatusPaginate): Promise<any> {
    const { skip, limit } = params;
    return this.model.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $facet: {
          metadata: [
            {
              $count: 'total',
            },
          ],
          data: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ]);
  }

  async update(id: string, params: TStatus[]): Promise<Status> {
    return this.model.findByIdAndUpdate(id, {
      $set: { next: params },
    });
  }

  async delete(id: string): Promise<Status> {
    return this.model.findByIdAndUpdate(id, {
      $set: { isDeleted: true },
    });
  }
}
