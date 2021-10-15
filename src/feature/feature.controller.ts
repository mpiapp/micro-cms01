import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IdDTO } from './dto/id.dto';
import { CreateFeatureDTO } from './dto/create-feature.dto';
import { UpdateFeatureDTO } from './dto/update-feature.dto';
import { FeatureService } from './feature.service';
import { Feature } from './schema/feature.schema';

@ApiTags('Feature')
@Controller('feature')
export class FeatureController {

    constructor(private readonly featureService:FeatureService){}

    @ApiCreatedResponse({ type: Feature, description: 'post a role' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @Post()
    async create(@Body() body: CreateFeatureDTO): Promise<Feature> {
        return this.featureService.create(body)
    }

    @ApiCreatedResponse({ type: Feature, description: 'update a role' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'id', required: true })
    @Put(':id')
    async update(@Param('id') id: IdDTO, @Body() body: UpdateFeatureDTO): Promise<Feature> {
        return this.featureService.update(id, body)
    }

    @ApiOkResponse({ type: Feature, description: 'get a role by ID' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    async findById(@Param('id') id: IdDTO): Promise<Feature> {
        return this.featureService.findById(id)
    }

    @ApiOkResponse({ type: [Feature], description: 'get role' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @ApiQuery({ name: 'name', required: false })
    @Get()
    async find(@Query() name: string): Promise<Feature[]> {
        return this.featureService.find(name)
    }

    @ApiOkResponse({ type: Feature, description: 'delete a role by ID' })
    @ApiBadRequestResponse({ description: 'False Request Payload' })
    @Delete(':id')
    async delete(@Param('id') id: IdDTO): Promise<Feature> {
        return this.featureService.delete(id);
    }

    @Patch('capabilities')
    async find_cap(): Promise<any> {

        const features = await this.featureService.find({})
        let result = []
        var temporary_capabilities = []

        for( var element in features ) { 
            if( features[element].capability_ids && features[element].capability_ids.length > 0 ) {
                for( var el in features[element].capability_ids ) {
                    var temporary_capability_object = await this.featureService.findCapabilityById({ id: features[element].capability_ids[el].valueOf() })
                    temporary_capabilities.push({
                        _id: temporary_capability_object._id.valueOf(),
                        name: temporary_capability_object.name,
                    })
                }

                result.push({
                    id: features[0]["_id"].valueOf(),
                    name: features[element].name,
                    capabilities: temporary_capabilities
                })

                temporary_capabilities = []

            } else {
                result.push({
                    id: features[0]["_id"].valueOf(),
                    name : features[element].name,
                    capabilities : []
                })
            }
        }
        return result
    }
}
