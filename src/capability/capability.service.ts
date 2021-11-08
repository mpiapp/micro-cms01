import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCapabilitiesDTO } from './dto/create-capabilities.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateCapabilitiesDTO } from './dto/update-capabilities.dto';
import { Capabilities, CapabilitiesDocument } from './schema/capability.schema';

@Injectable()
export class CapabilityService {
  constructor(
    @InjectModel(Capabilities.name)
    private readonly capabilitiesModel: Model<CapabilitiesDocument>,
  ) {}

  async create(body: CreateCapabilitiesDTO): Promise<Capabilities> {
    return this.capabilitiesModel.create(body);
  }

  async update(id: IdDTO, body: UpdateCapabilitiesDTO): Promise<Capabilities> {
    return this.capabilitiesModel.findByIdAndUpdate(id, body);
  }

  async findById(id: any): Promise<Capabilities> {
    return this.capabilitiesModel.findById(id);
  }

  async find(q): Promise<Capabilities[]> {
    const condition = q['name']
      ? { name: { $regex: '.*' + q['name'] + '.*' } }
      : {};
    return this.capabilitiesModel.find(condition);
  }

  async delete(id: IdDTO): Promise<Capabilities> {
    return this.capabilitiesModel.findByIdAndDelete(id);
  }
}
