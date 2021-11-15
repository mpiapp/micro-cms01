import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyLegalDocService } from './companylegaldoc.service';
import { CompanyLegalDocAddDTO } from './dto/companylegaldoc.add.dto';
import { CompanyLegalDocDeleteDTO } from './dto/companylegaldoc.delete.dto';
import { CompanyLegalDocEditDTO } from './dto/companylegaldoc.edit.dto';
import { CompanyLegalDoc } from './schema/companylegaldoc.schema';

@ApiTags('Mapping Company Type X Legal Doc')
@Controller('company-legaldoc')
export class CompanyLegalDocController {
    constructor(private legalDocService: CompanyLegalDocService) {}

    @Get()
    async getAll(): Promise<CompanyLegalDoc[]> {
        return this.legalDocService.getAll();
    }
    
    @Post()
    async create(@Body() legalDoc: CompanyLegalDocAddDTO): Promise<CompanyLegalDoc> {
        return this.legalDocService.create(legalDoc);
    }

    @Put()
    async update(@Body() legalDoc: CompanyLegalDocEditDTO): Promise<CompanyLegalDoc> {
        return this.legalDocService.edit(legalDoc);
    }

    @Delete()
    async delete(@Body() legalDoc: CompanyLegalDocDeleteDTO): Promise<CompanyLegalDoc> {
        legalDoc.deletedAt = new Date;
        return this.legalDocService.delete(legalDoc);
    }
}