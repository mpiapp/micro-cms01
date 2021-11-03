import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Status } from './../../schema/status.schema';
import { mockSampleDataStatus } from './../../../../test/mocks/Status/Sample-data.mocks';
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
});
