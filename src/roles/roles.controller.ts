import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoleDepDTO } from './dto/create-role-dep.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateRoleDepDTO } from './dto/update-role-dep.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { GlobalRoleInterface } from './interfaces/role.interface';
import { RolesService } from './roles.service';
import { Role } from './schema/roles.schema';

@ApiTags('Roles')
@Controller('roles')
export class RolesController implements GlobalRoleInterface {
  constructor(private readonly rolesService: RolesService) {}

  @ApiCreatedResponse({ type: Role, description: 'post a role' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @Post()
  async create(@Body() body: CreateRoleDTO): Promise<Role> {
    return this.rolesService.create(body);
  }

  @ApiCreatedResponse({
    type: Role,
    description: 'post a role with dependency',
  })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @Post('dependency')
  async createdep(@Body() body: CreateRoleDepDTO): Promise<any> {
    const newRole = await this.rolesService.create_dep(body);
    if (newRole === '') throw new BadRequestException('Feature ID not found');
    return newRole;
  }

  @ApiCreatedResponse({ type: Role, description: 'update a role' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiParam({ name: 'id', required: true })
  @Put(':id')
  async update(
    @Param('id') id: IdDTO,
    @Body() body: UpdateRoleDTO,
  ): Promise<Role> {
    return this.rolesService.update(id, body);
  }

  @ApiCreatedResponse({
    type: Role,
    description: 'update a role with dependency',
  })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiParam({ name: 'id', required: true })
  @Put('dependency/:id')
  async update_dep(
    @Param('id') id: IdDTO,
    @Body() body: UpdateRoleDepDTO,
  ): Promise<any> {
    const updatedRole = await this.rolesService.update_dep(id, body);
    if (updatedRole === '') throw new BadRequestException('ID not found');
    return updatedRole;
  }

  @ApiOkResponse({ type: Role, description: 'get a role by ID' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findById(@Param('id') id: IdDTO): Promise<Role> {
    return this.rolesService.findById(id);
  }

  @ApiOkResponse({ type: [Role], description: 'get role' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async find(@Query() name: string): Promise<Role[]> {
    return this.rolesService.find(name);
  }

  @Patch('modules')
  async findModules(): Promise<any> {
    const roles = await this.rolesService.find({});
    const result = [];
    let temporary_modules = [];

    for (const element in roles) {
      if (roles[element] && roles[element].module_ids.length > 0) {
        for (const el in roles[element].module_ids) {
          const temporary_module_object =
            await this.rolesService.findModuleById({
              id: roles[element].module_ids[el].valueOf(),
            });

          if (temporary_module_object) {
            temporary_modules.push({
              _id: temporary_module_object._id.valueOf(),
              name: temporary_module_object.name,
              link: temporary_module_object.link,
              feature_ids: temporary_module_object.feature_ids,
            });
          }
        }
        result.push({
          _id: roles[element]['_id'].valueOf(),
          name: roles[element].name,
          flag: roles[element].flag,
          modules: temporary_modules,
        });
        temporary_modules = [];
      } else {
        result.push({
          _id: roles[element]['_id'].valueOf(),
          name: roles[element].name,
          flag: roles[element].flag,
          modules: [],
        });
      }
    }

    return result;
  }

  @ApiParam({ name: 'id', required: true })
  @Get(':id/modules')
  async find_dep(@Param('id') id: IdDTO): Promise<any> {
    const modules = await this.rolesService.findModules();
    const role = await this.findById(id);
    const result = [];

    if (role.module_ids && role.module_ids.length > 0) {
      for (const element in modules) {
        if (role.module_ids.includes(modules[element]._id.valueOf())) {
          result.push({
            _id: modules[element]._id,
            name: modules[element].name,
            isTrue: true,
          });
        } else {
          result.push({
            _id: modules[element]._id,
            name: modules[element].name,
            isTrue: false,
          });
        }
      }
    } else {
      for (const i in modules) {
        result.push({
          _id: modules[i]._id,
          name: modules[i].name,
          isTrue: false,
        });
      }
    }
    return result;
  }

  @ApiOkResponse({ type: Role, description: 'delete a role by ID' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @Delete(':id')
  async delete(@Param('id') id: IdDTO): Promise<Role> {
    return this.rolesService.delete(id);
  }
}
