import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyCategoryService } from './companycategory.service';
import { CompanyCategoryAddDTO } from './dto/companycategory.add.dto';
import { CompanyCategoryDeleteDTO } from './dto/companycategory.delete.dto';
import { CompanyCategoryEditDTO } from './dto/companycategory.edit.dto';
import { CompanyCategory } from './schema/companycategory.schema';

@ApiTags('Company Category Module')
@Controller('company-category')
export class CompanyCategoryController {
    constructor(private companyCategoryService: CompanyCategoryService) {}

    @Get()
    async getAll(): Promise<CompanyCategory[]> {
        return this.companyCategoryService.getAll();
    }
    
    @Post()
    async create(@Body() CompanyCategory: CompanyCategoryAddDTO): Promise<CompanyCategory> {
        return this.companyCategoryService.create(CompanyCategory);
    }

    @Put()
    async update(@Body() CompanyCategory: CompanyCategoryEditDTO): Promise<CompanyCategory> {
        return this.companyCategoryService.edit(CompanyCategory);
    }

    @Delete()
    async delete(@Body() CompanyCategory: CompanyCategoryDeleteDTO): Promise<CompanyCategory> {
        CompanyCategory.deletedAt = new Date;
        return this.companyCategoryService.delete(CompanyCategory);
    }
}