import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockSampleDataStatus,
  mockSampleDataStatuses,
} from './../../test/mocks/Status/Sample-data.mocks';
import { mockStatusService } from './../../test/mocks/Status/Service.mocks';
import { Status } from './schema/status.schema';
import { ConfigStatusService } from './services/config-status.service';
import { MasterStatusService } from './services/master-status.service';
import { StatusController } from './status.controller';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        MasterStatusService,
        ConfigStatusService,
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

  it('should status get all end point', async () => {
    expect(await controller.getAll()).toEqual({
      errors: null,
      status: 200,
      message: 'Get All Status Success',
      data: mockSampleDataStatuses,
    });
  });

  it('should status get all end point failed', async () => {
    mockStatusService.find.mockRejectedValue(new Error());

    try {
      await controller.getAll();
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: 'get All Status Failed',
      });
    }
  });

  it('should status get One end point', async () => {
    expect(await controller.getOne(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: 'Get One Status Success',
      data: mockSampleDataStatus,
    });
  });

  it('should status get One end point failed', async () => {
    mockStatusService.findById.mockRejectedValue(new Error());

    try {
      await controller.getOne(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: 'get One Status Failed',
      });
    }
  });

  it('should be get Paginate delivery note', async () => {
    mockStatusService.aggregate.mockReturnValue([
      { data: mockSampleDataStatuses, metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.getPaginate({
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      page: 0,
      limit: 10,
      data: mockSampleDataStatuses,
      count: 1,
    });
  });

  it('should be get Paginate delivery note Metadata Null', async () => {
    mockStatusService.aggregate.mockReturnValue([
      { data: mockSampleDataStatuses, metadata: [] },
    ]);

    expect(
      await controller.getPaginate({
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: mockSampleDataStatuses,
    });
  });

  it('should be get Paginate delivery failed', async () => {
    mockStatusService.aggregate.mockReturnValue(false);

    expect(
      await controller.getPaginate({
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: null,
    });
  });

  it('should be assign status', async () => {
    expect(
      await controller.assign({
        id: expect.any(String),
        name: 'Open',
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: 'Assign Status Success',
      data: mockSampleDataStatus,
    });
  });

  it('should be unassign status', async () => {
    expect(
      await controller.unassign({
        id: expect.any(String),
        name: 'Open',
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: 'UnAssign Status Success',
      data: mockSampleDataStatus,
    });
  });

  it('should be assign status failed', async () => {
    mockStatusService.findByIdAndUpdate.mockRejectedValue(new Error());

    try {
      await controller.assign({
        id: expect.any(String),
        name: 'Open',
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: 'Assign Status Failed',
      });
    }
  });

  it('should be unassign status failed', async () => {
    try {
      await controller.unassign({
        id: expect.any(String),
        name: 'Open',
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: 'UnAssign Status Failed',
      });
    }
  });

  it('should be check status success', async () => {
    expect(
      await controller.checkStatus({
        currentStatus: 'Open',
        newStatus: 'Confirm',
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: 'Status Check Success',
    });
  });

  it('should be check status failed', async () => {
    mockStatusService.findOne.mockRejectedValue(new Error());

    try {
      await controller.checkStatus({
        currentStatus: 'Open',
        newStatus: 'Confirm',
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: 'UnAssign Status Failed',
      });
    }
  });
});
