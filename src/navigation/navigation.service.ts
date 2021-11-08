import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CapabilityService } from '../capability/capability.service';
import { FeatureService } from '../feature/feature.service';
import { CreateNavigationDTO } from './dto/create-navigation.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateNavigationDTO } from './dto/update-navigation.dto';
import { Module, ModuleDocument } from './schema/navigation.schema';

@Injectable()
export class NavigationService {
  constructor(
    @InjectModel(Module.name)
    private readonly moduleModel: Model<ModuleDocument>,
    private readonly featureService: FeatureService,
    private readonly capabilityService: CapabilityService,
  ) {}

  async create(body: CreateNavigationDTO): Promise<Module> {
    return this.moduleModel.create(body);
  }

  async update(id: IdDTO, body: UpdateNavigationDTO): Promise<Module> {
    return this.moduleModel.findByIdAndUpdate(id, body);
  }

  async findById(id: any): Promise<Module> {
    return this.moduleModel.findById(id);
  }

  async find(q): Promise<Module[]> {
    const condition = q['name']
      ? { role: { $regex: '.*' + q['name'] + '.*' } }
      : {};
    return this.moduleModel.find(condition);
  }

  async delete(id: IdDTO): Promise<Module> {
    return this.moduleModel.findByIdAndDelete(id);
  }

  async findFeatureById(id: IdDTO): Promise<any> {
    return this.featureService.findById(id.id);
  }

  async findCapabilityById(id: IdDTO): Promise<any> {
    return this.capabilityService.findById(id.id);
  }
}
