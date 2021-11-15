import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyCategoryAddDTO } from './dto/companycategory.add.dto';
import { CompanyCategoryDeleteDTO } from './dto/companycategory.delete.dto';
import { CompanyCategoryEditDTO } from './dto/companycategory.edit.dto';
import { CompanyCategory, CompanyCategoryDocument } from './schema/companycategory.schema';

@Injectable()
export class CompanyCategoryService {
    constructor(@InjectModel(CompanyCategory.name) private companyCategoryModel: Model<CompanyCategoryDocument>) {}

    async create(companyCategory: CompanyCategoryAddDTO): Promise<CompanyCategory> {
        return this.companyCategoryModel.create(companyCategory);
    }

    async edit(companyCategory: CompanyCategoryEditDTO): Promise<CompanyCategory> {
        return await this.companyCategoryModel.findOneAndUpdate({_id: companyCategory._id}, companyCategory, { new: true , useFindAndModify: false});
    }

    async delete(companyCategory: CompanyCategoryDeleteDTO) {
        return await this.companyCategoryModel.findOneAndUpdate({ _id : companyCategory._id, deletedAt: { "$eq": null } }, companyCategory, { new: true , useFindAndModify: false});
    }

    async getAll(): Promise<CompanyCategory[]> {
        return await this.companyCategoryModel.find({ deletedAt: { "$eq": null } });
    }
}
