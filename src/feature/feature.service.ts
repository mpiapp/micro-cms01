import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdDTO } from './dto/id.dto';
import { CreateFeatureDTO } from './dto/create-feature.dto';
import { UpdateFeatureDTO } from './dto/update-feature.dto';
import { Feature, FeatureDocument } from './schema/feature.schema';
import { CapabilityService } from '../capability/capability.service';

@Injectable()
export class FeatureService {

    constructor( 
        @InjectModel(Feature.name) private featureModel: Model<FeatureDocument>,
        private readonly capabilityService: CapabilityService
        ){}

    async create(body: CreateFeatureDTO): Promise<Feature> {
        body.name = body.name.split(' ').join('_').toUpperCase()
        return this.featureModel.create(body)
    }

    async update(id: IdDTO, body: UpdateFeatureDTO ): Promise<Feature> {
        if( body.name ) body.name = body.name.split(' ').join('_').toUpperCase()
        return this.featureModel.findByIdAndUpdate(id, body)
    }

    async findById(id: any): Promise<Feature> {
        return this.featureModel.findById(id)
    }
    
    async find(q): Promise<Feature[]> {
        let condition = q["name"] ? { name: { $regex: '.*' + q['name'].split(' ').join('_').toUpperCase() + '.*' } } : {}
        return this.featureModel.find(condition)
    }

    async delete(id: IdDTO): Promise<Feature> {
        return this.featureModel.findByIdAndDelete(id)
    }

    async findCapabilityById(id: IdDTO): Promise<any> {
        return this.capabilityService.findById(id.id)
    }

}
