import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { CapabilityService } from './capability.service';
import { CreateCapabilitiesDTO } from './dto/create-capabilities.dto';
import { IdDTO } from './dto/id.dto';
import { UpdateCapabilitiesDTO } from './dto/update-capabilities.dto';
import { Capabilities } from './schema/capability.schema';

@ApiTags('Capability')
@Controller('capability')
export class CapabilityController {
  constructor(private readonly capabilityService: CapabilityService) {}

  @ApiCreatedResponse({ type: Capabilities, description: 'post a navigation' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @Post()
  async create(@Body() body: CreateCapabilitiesDTO): Promise<Capabilities> {
    return this.capabilityService.create(body);
  }

  @ApiCreatedResponse({
    type: Capabilities,
    description: 'update a navigation',
  })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiParam({ name: 'id', required: true })
  @Put(':id')
  async update(
    @Param('id') id: IdDTO,
    @Body() body: UpdateCapabilitiesDTO,
  ): Promise<Capabilities> {
    return this.capabilityService.update(id, body);
  }

  @ApiOkResponse({ type: Capabilities, description: 'get a navigation by ID' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findById(@Param('id') id: IdDTO): Promise<Capabilities> {
    return this.capabilityService.findById(id);
  }

  @ApiOkResponse({ type: [Capabilities], description: 'get navigations' })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async find(@Query() name: string): Promise<Capabilities[]> {
    return this.capabilityService.find(name);
  }

  @ApiOkResponse({
    type: Capabilities,
    description: 'delete a navigation by ID',
  })
  @ApiBadRequestResponse({ description: 'False Request Payload' })
  @Delete(':id')
  async delete(@Param('id') id: IdDTO): Promise<Capabilities> {
    return this.capabilityService.delete(id);
  }
}
