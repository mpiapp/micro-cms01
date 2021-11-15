import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyLegalDocAddDTO } from './dto/companylegaldoc.add.dto';
import { CompanyLegalDocDeleteDTO } from './dto/companylegaldoc.delete.dto';
import { CompanyLegalDocEditDTO } from './dto/companylegaldoc.edit.dto';
import { CompanyLegalDoc, CompanyLegalDocDocument } from './schema/companylegaldoc.schema';

@Injectable()
export class CompanyLegalDocService {
    constructor(@InjectModel(CompanyLegalDoc.name) private companyLegalDocModel: Model<CompanyLegalDocDocument>) {}

    async create(companyLegalDoc: CompanyLegalDocAddDTO): Promise<CompanyLegalDoc> {
        return this.companyLegalDocModel.create(companyLegalDoc);
    }

    async edit(companyLegalDoc: CompanyLegalDocEditDTO): Promise<CompanyLegalDoc> {
        return await this.companyLegalDocModel.findOneAndUpdate({_id: companyLegalDoc._id}, companyLegalDoc, { new: true , useFindAndModify: false});
    }

    async delete(companyLegalDoc: CompanyLegalDocDeleteDTO) {
        return await this.companyLegalDocModel.findOneAndUpdate({ _id : companyLegalDoc._id, deletedAt: { "$eq": null } }, companyLegalDoc, { new: true , useFindAndModify: false});
    }

    async getAll(): Promise<CompanyLegalDoc[]> {
        return await this.companyLegalDocModel.find({ deletedAt: { "$eq": null } });
    }
}
