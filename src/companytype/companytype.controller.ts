import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyTypeService } from './companytype.service';
import { CompanyTypeAddDTO } from './dto/companytype.add.dto';
import { CompanyTypeDeleteDTO } from './dto/companytype.delete.dto';
import { CompanyTypeEditDTO } from './dto/companytype.edit.dto';
import { CompanyType } from './schema/companytype.schema';

@ApiTags('Company Type Module')
@Controller('company-type')
export class CompanyTypeController {
    constructor(private companyTypeService: CompanyTypeService) {}

    @Get()
    async getAll(): Promise<CompanyType[]> {
        return this.companyTypeService.getAll();
    }
    
    @Post()
    async create(@Body() CompanyType: CompanyTypeAddDTO): Promise<CompanyType> {
        return this.companyTypeService.create(CompanyType);
    }

    @Put()
    async update(@Body() CompanyType: CompanyTypeEditDTO): Promise<CompanyType> {
        return this.companyTypeService.edit(CompanyType);
    }

    @Delete()
    async delete(@Body() CompanyType: CompanyTypeDeleteDTO): Promise<CompanyType> {
        CompanyType.deletedAt = new Date;
        return this.companyTypeService.delete(CompanyType);
    }
}