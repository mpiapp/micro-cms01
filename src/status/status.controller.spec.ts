import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockSampleDataStatus } from './../../test/mocks/Status/Sample-data.mocks';
import { mockStatusService } from './../../test/mocks/Status/Service.mocks';
import { Status } from './schema/status.schema';
import { MasterStatusService } from './services/master-status.service';
import { StatusController } from './status.controller';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        MasterStatusService,
        {
          provide: getModelToken(Status.name),
          useValue: mockStatusService,
        },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should status end point', async () => {
    expect(await controller.save({ name: 'Open' })).toEqual({
      errors: null,
      status: 201,
      message: 'Status Save Success',
    });
  });

  it('should status end point fail', async () => {
    mockStatusService.create.mockRejectedValue(new Error());

    try {
      await controller.save({ name: 'Open' });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: 'Status Save Failed',
      });
    }
  });
});
