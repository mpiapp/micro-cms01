import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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

    constructor(private readonly rolesService:RolesService){}

    @ApiCreatedResponse({ type: Role, description: 'post a role' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @Post()
    async create(@Body() body: CreateRoleDTO): Promise<Role> {
        return this.rolesService.create(body)
    }

    @ApiCreatedResponse({ type: Role, description: 'post a role with dependency' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @Post('dependency')
    async createdep(@Body() body: CreateRoleDepDTO): Promise<any> {
        const newRole = await this.rolesService.create_dep(body)
        if( newRole === "" ) throw new BadRequestException("Feature ID not found")
        return newRole
    }

    @ApiCreatedResponse({ type: Role, description: 'update a role' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'id', required: true })
    @Put(':id')
    async update(@Param('id') id: IdDTO, @Body() body: UpdateRoleDTO): Promise<Role> {
        return this.rolesService.update(id, body)
    }

    @ApiCreatedResponse({ type: Role, description: 'update a role with dependency' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'id', required: true })
    @Put('dependency/:id')
    async update_dep(@Param('id') id: IdDTO, @Body() body: UpdateRoleDepDTO): Promise<any> {
        const updatedRole = await this.rolesService.update_dep(id, body)
        if( updatedRole === "" ) throw new BadRequestException("ID not found")
        return updatedRole
    }

    @ApiOkResponse({ type: Role, description: 'get a role by ID' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    async findById(@Param('id') id: IdDTO): Promise<Role> {
        return this.rolesService.findById(id)
    }

    @ApiOkResponse({ type: [Role], description: 'get role' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiQuery({ name: 'name', required: false })
    @Get()
    async find(@Query() name: string): Promise<Role[]> {
        return this.rolesService.find(name)
    }

    @ApiParam({ name: 'id', required: true })
    @Get(':id/modules')
    async find_dep( @Param('id') id: IdDTO ): Promise<any> {
        const modules = await this.rolesService.findModules()
        const role = await this.findById(id)
        let result = []

        if( role.module_ids && role.module_ids.length > 0 ) {
            for( var element in modules ) {
                if( role.module_ids.includes(modules[element]._id.valueOf()) ) {
                    result.push({
                        _id: modules[element]._id,
                        name: modules[element].name,
                        isTrue: true
                    })
                } else {
                    result.push({
                        _id: modules[element]._id,
                        name: modules[element].name,
                        isTrue: false
                    })
                }
            }
        } else {
            for( var i in modules ) {
                result.push({
                    _id: modules[i]._id,
                    name: modules[i].name,
                    isTrue: false
                })
            } 
        }
        return result
    }

    @ApiOkResponse({ type: Role, description: 'delete a role by ID' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @Delete(':id')
    async delete(@Param('id') id: IdDTO): Promise<Role> {
        return this.rolesService.delete(id);
    }
}
