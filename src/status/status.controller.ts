import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusCreateParmDto } from './dto/statusCreate.dto';
import { BaseResponse } from './interfaces/responses/Base.Response';
import { MasterStatusService } from './services/master-status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly masterStatusService: MasterStatusService) {}

  @Post()
  @ApiBody({ type: StatusCreateParmDto })
  @ApiOperation({ summary: 'Save Status' })
  async save(param: StatusCreateParmDto): Promise<BaseResponse> {
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
}
