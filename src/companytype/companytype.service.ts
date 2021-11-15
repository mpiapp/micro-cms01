import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyTypeAddDTO } from './dto/companytype.add.dto';
import { CompanyTypeDeleteDTO } from './dto/companytype.delete.dto';
import { CompanyTypeEditDTO } from './dto/companytype.edit.dto';
import { CompanyType, CompanyTypeDocument } from './schema/companytype.schema';

@Injectable()
export class CompanyTypeService {
    constructor(@InjectModel(CompanyType.name) private companyTypeModel: Model<CompanyTypeDocument>) {}

    async create(companyType: CompanyTypeAddDTO): Promise<CompanyType> {
        return this.companyTypeModel.create(companyType);
    }

    async edit(companyType: CompanyTypeEditDTO): Promise<CompanyType> {
        return await this.companyTypeModel.findOneAndUpdate({_id: companyType._id}, companyType, { new: true , useFindAndModify: false});
    }

    async delete(companyType: CompanyTypeDeleteDTO) {
        return await this.companyTypeModel.findOneAndUpdate({ _id : companyType._id, deletedAt: { "$eq": null } }, companyType, { new: true , useFindAndModify: false});
    }

    async getAll(): Promise<CompanyType[]> {
        return await this.companyTypeModel.find({ deletedAt: { "$eq": null } });
    }
}
