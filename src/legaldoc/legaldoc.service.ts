import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LegalDocAddDTO } from './dto/legaldoc.add.dto';
import { LegalDocDeleteDTO } from './dto/legaldoc.delete.dto';
import { LegalDocEditDTO } from './dto/legaldoc.edit.dto';
import { LegalDoc, LegalDocDocument } from './schema/legaldoc.schema';

@Injectable()
export class LegalDocService {
    constructor(@InjectModel(LegalDoc.name) private legalDocModel: Model<LegalDocDocument>) {}

    async create(legalDoc: LegalDocAddDTO): Promise<LegalDoc> {
        return this.legalDocModel.create(legalDoc);
    }

    async edit(legalDoc: LegalDocEditDTO): Promise<LegalDoc> {
        return await this.legalDocModel.findOneAndUpdate({_id: legalDoc._id}, legalDoc, { new: true , useFindAndModify: false});
    }

    async delete(legalDoc: LegalDocDeleteDTO) {
        return await this.legalDocModel.findOneAndUpdate({ _id : legalDoc._id, deletedAt: { "$eq": null } }, legalDoc, { new: true , useFindAndModify: false});
    }

    async getAll(): Promise<LegalDoc[]> {
        return await this.legalDocModel.find({ deletedAt: { "$eq": null } });
    }
}
