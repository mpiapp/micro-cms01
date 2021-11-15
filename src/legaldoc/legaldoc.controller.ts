import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LegalDocService } from './legaldoc.service';
import { LegalDocAddDTO } from './dto/legaldoc.add.dto';
import { LegalDocDeleteDTO } from './dto/legaldoc.delete.dto';
import { LegalDocEditDTO } from './dto/legaldoc.edit.dto';
import { LegalDoc } from './schema/legaldoc.schema';

@ApiTags('Legal Doc Module')
@Controller('legaldoc')
export class LegalDocController {
    constructor(private legalDocService: LegalDocService) {}

    @Get()
    async getAll(): Promise<LegalDoc[]> {
        return this.legalDocService.getAll();
    }
    
    @Post()
    async create(@Body() legalDoc: LegalDocAddDTO): Promise<LegalDoc> {
        legalDoc.name = legalDoc.title.replace(/[\W_]/g, '').toLowerCase();
        return this.legalDocService.create(legalDoc);
    }

    @Put()
    async update(@Body() legalDoc: LegalDocEditDTO): Promise<LegalDoc> {
        return this.legalDocService.edit(legalDoc);
    }

    @Delete()
    async delete(@Body() legalDoc: LegalDocDeleteDTO): Promise<LegalDoc> {
        legalDoc.deletedAt = new Date;
        return this.legalDocService.delete(legalDoc);
    }
}