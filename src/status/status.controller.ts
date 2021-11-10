import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StatusPaginateDto } from './dto/paginate.dto';
import { StatusUnOrAssignParmDto } from './dto/statusAssign.dto';
import { StatusCheckParmDto } from './dto/statusCheck.dto';
import { StatusCreateParmDto } from './dto/statusCreate.dto';
import { BaseResponse } from './interfaces/responses/Base.Response';
import { StatusesResponse } from './interfaces/responses/Many.Response';
import { StatusPaginateResponse } from './interfaces/responses/Paginate.Response';
import { StatusResponse } from './interfaces/responses/Single.Response';
import { ConfigStatusService } from './services/config-status.service';
import { MasterStatusService } from './services/master-status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(
    private readonly masterStatusService: MasterStatusService,
    private readonly configStatusService: ConfigStatusService,
  ) {}

  @Get('list')
  @ApiOperation({ summary: 'List Status' })
  async getAll(): Promise<StatusesResponse> {
    try {
      const getAll = await this.masterStatusService.getAll();
      return {
        status: HttpStatus.OK,
        message: 'Get All Status Success',
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'Get All Status Failed',
        data: null,
        errors: error,
      };
    }
  }

  @Get('byId')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get One Status' })
  async getOne(@Query('id') id: string): Promise<StatusResponse> {
    try {
      const One = await this.masterStatusService.getOne(id);
      return {
        status: HttpStatus.OK,
        message: 'Get One Status Success',
        data: One,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'Get One Status Failed',
        data: null,
        errors: error,
      };
    }
  }

  @Get('Paginate')
  @ApiOperation({ summary: 'Get Statuses Paginate' })
  async getPaginate(
    @Query() params: StatusPaginateDto,
  ): Promise<StatusPaginateResponse> {
    const { skip, limit } = params;
    const getData = await this.masterStatusService.getPaginate(params);
    if (!getData) {
      return {
        count: 0,
        page: skip,
        limit: limit,
        data: null,
      };
    }
    const { data, metadata } = getData[0];
    return {
      count: metadata[0] ? metadata[0].total : 0,
      page: skip,
      limit: limit,
      data: data,
    };
  }

  @Post()
  @ApiBody({ type: StatusCreateParmDto })
  @ApiOperation({ summary: 'Save Status' })
  async save(@Body() param: StatusCreateParmDto): Promise<BaseResponse> {
    try {
      await this.masterStatusService.save(param);
      return {
        status: HttpStatus.CREATED,
        message: 'Status Save Success',
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'Status Save Failed',
        errors: error,
      };
    }
  }

  @Post('Assign')
  @ApiBody({ type: StatusUnOrAssignParmDto })
  @ApiOperation({ summary: 'Assign Status' })
  async assign(
    @Body() param: StatusUnOrAssignParmDto,
  ): Promise<StatusResponse> {
    try {
      const save = await this.configStatusService.assign(param);
      return {
        status: HttpStatus.OK,
        message: 'Assign Status Success',
        errors: null,
        data: save,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'Assign Status Failed',
        errors: error,
        data: null,
      };
    }
  }

  @Post('Unassign')
  @ApiBody({ type: StatusUnOrAssignParmDto })
  @ApiOperation({ summary: 'Unassign Status' })
  async unassign(
    @Body() param: StatusUnOrAssignParmDto,
  ): Promise<StatusResponse> {
    try {
      const save = await this.configStatusService.unassign(param);
      return {
        status: HttpStatus.OK,
        message: 'UnAssign Status Success',
        errors: null,
        data: save,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'UnAssign Status Failed',
        errors: error,
        data: null,
      };
    }
  }

  @Post('Check')
  @ApiBody({ type: StatusCheckParmDto })
  @ApiOperation({ summary: 'Unassign Status' })
  async checkStatus(@Body() params: StatusCheckParmDto): Promise<BaseResponse> {
    try {
      await this.configStatusService.checkStatus(params);
      return {
        status: HttpStatus.OK,
        message: 'Status Check Success',
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'Status Check Failed',
        errors: error,
      };
    }
  }
}
