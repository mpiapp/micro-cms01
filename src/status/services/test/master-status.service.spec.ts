import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Status } from './../../schema/status.schema';
import {
  mockSampleDataStatus,
  mockSampleDataStatuses,
} from './../../../../test/mocks/Status/Sample-data.mocks';
import { mockStatusService } from './../../../../test/mocks/Status/Service.mocks';
import { MasterStatusService } from '../master-status.service';

describe('MasterStatusService', () => {
  let service: MasterStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MasterStatusService,
        {
          provide: getModelToken(Status.name),
          useValue: mockStatusService,
        },
      ],
    }).compile();

    service = module.get<MasterStatusService>(MasterStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be save status', async () => {
    expect(
      await service.save({
        name: 'Open',
      }),
    ).toEqual(mockSampleDataStatus);
  });

  it('should be get One', async () => {
    expect(await service.getOne(expect.any(String))).toEqual(
      mockSampleDataStatus,
    );
  });

  it('should be get All', async () => {
    expect(await service.getAll()).toEqual(mockSampleDataStatuses);
  });

  it('should be get Paginate', async () => {
    expect(await service.getPaginate({ skip: 0, limit: 10 })).toEqual([
      mockSampleDataStatus,
    ]);
  });

  it('should be update status', async () => {
    expect(
      await service.update(expect.any(String), [
        {
          name: 'Open',
        },
        {
          name: 'Test',
        },
      ]),
    ).toEqual(mockSampleDataStatus);
  });

  it('should be delete status', async () => {
    expect(await service.delete(expect.any(String))).toEqual(
      mockSampleDataStatus,
    );
  });
});
