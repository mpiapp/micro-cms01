import {
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
import { CreateNavigationDTO } from './dto/create-navigation.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateNavigationDTO } from './dto/update-navigation.dto';
import { NavigationService } from './navigation.service';
import { Module } from './schema/navigation.schema';

@ApiTags('Module')
@Controller('module')
export class NavigationController {
  constructor(private readonly moduleService: NavigationService) {}

  @ApiCreatedResponse({ type: Module, description: 'post a navigation' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @Post()
  async create(@Body() body: CreateNavigationDTO): Promise<Module> {
    return this.moduleService.create(body);
  }

  @ApiCreatedResponse({ type: Module, description: 'update a navigation' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiParam({ name: 'id', required: true })
  @Put(':id')
  async update(
    @Param('id') id: IdDTO,
    @Body() body: UpdateNavigationDTO,
  ): Promise<Module> {
    return this.moduleService.update(id, body);
  }

  @ApiOkResponse({ type: Module, description: 'get a navigation by ID' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findById(@Param('id') id: IdDTO): Promise<Module> {
    return this.moduleService.findById(id);
  }

  @ApiOkResponse({ type: [Module], description: 'get navigations' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async find(@Query() name: string): Promise<Module[]> {
    return this.moduleService.find(name);
  }

  @ApiOkResponse({ type: Module, description: 'delete a navigation by ID' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @Delete(':id')
  async delete(@Param('id') id: IdDTO): Promise<Module> {
    return this.moduleService.delete(id);
  }

  @Patch('features')
  async findFeatures(): Promise<any> {
    const modules = await this.moduleService.find({});
    const result = [];
    let temporary_features = [];

    for (const element in modules) {
      if (
        modules[element].feature_ids &&
        modules[element].feature_ids.length > 0
      ) {
        for (const el in modules[element].feature_ids) {
          const temporary_feature_object =
            await this.moduleService.findFeatureById({
              id: modules[element].feature_ids[el].valueOf(),
            });
          if (temporary_feature_object) {
            temporary_features.push({
              _id: temporary_feature_object._id.valueOf(),
              name: temporary_feature_object.name,
              capability_ids: temporary_feature_object.capability_ids,
            });
          }
        }
        result.push({
          _id: modules[element]['_id'].valueOf(),
          name: modules[element].name,
          link: modules[element].link,
          flag: modules[element].flag,
          features: temporary_features,
        });
        temporary_features = [];
      } else {
        result.push({
          _id: modules[element]['_id'].valueOf(),
          name: modules[element].name,
          link: modules[element].link,
          flag: modules[element].flag,
          features: [],
        });
      }
    }
    return result;
  }
}
