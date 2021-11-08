import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NavigationService } from '../navigation/navigation.service';
import { CreateRoleDepDTO } from './dto/create-role-dep.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateRoleDepDTO } from './dto/update-role-dep.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { GlobalRoleInterface } from './interfaces/role.interface';
import { Role, RoleDocument } from './schema/roles.schema';

@Injectable()
export class RolesService implements GlobalRoleInterface {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    private readonly moduleService: NavigationService,
  ) {}

  async create(body: CreateRoleDTO): Promise<Role> {
    return this.roleModel.create(body);
  }

  async update(id: IdDTO, body: UpdateRoleDTO): Promise<Role> {
    await this.roleModel.findByIdAndUpdate(id, body);
    return this.findById(id);
  }

  async create_dep(body: CreateRoleDepDTO): Promise<any> {
    // check whether feature exist in the database
    for (const i in body.module_ids) {
      const dto = { id: body.module_ids[i] };
      const checkedModule = await this.moduleService.findById(dto.id);
      if (!checkedModule) return '';
    }

    return this.roleModel.create(body);
  }

  async update_dep(id: IdDTO, body: UpdateRoleDepDTO): Promise<any> {
    // check whether feature exist in the database
    for (const i in body.module_ids) {
      const dto = { id: body.module_ids[i] };
      const checkedModule = await this.moduleService.findById(dto.id);
      if (!checkedModule) return '';
    }

    await this.roleModel.findByIdAndUpdate(id, {
      role: body.name,
      module_ids: body.module_ids,
    });

    return this.findById(id);
  }

  async findById(id: IdDTO): Promise<Role> {
    return this.roleModel.findById(id);
  }

  async find(q): Promise<Role[]> {
    const condition = q['name']
      ? { role: { $regex: '.*' + q['name'] + '.*' } }
      : {};
    return this.roleModel.find(condition);
  }

  async delete(id: IdDTO): Promise<Role> {
    return this.roleModel.findByIdAndDelete(id);
  }

  async findModules(): Promise<any> {
    return this.moduleService.find({});
  }

  async findModuleById(id): Promise<any> {
    return this.moduleService.findById(id.id);
  }
}
