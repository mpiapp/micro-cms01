import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Status } from './../../schema/status.schema';
import { mockStatusService } from './../../../../test/mocks/Status/Service.mocks';
import { ConfigStatusService } from '../config-status.service';
import { mockSampleDataStatus } from './../../../../test/mocks/Status/Sample-data.mocks';

describe('ConfigStatusService', () => {
  let service: ConfigStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigStatusService,
        {
          provide: getModelToken(Status.name),
          useValue: mockStatusService,
        },
      ],
    }).compile();

    service = module.get<ConfigStatusService>(ConfigStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be assign status', async () => {
    expect(
      await service.assign({ id: expect.any(String), name: 'Open' }),
    ).toEqual(mockSampleDataStatus);
  });

  it('should be unassign By Id status', async () => {
    expect(
      await service.unassign({ id: expect.any(String), name: 'Open' }),
    ).toEqual(mockSampleDataStatus);
  });

  it('should be unassign By Id status', async () => {
    expect(await service.bulkUnassign('Open')).toEqual(mockSampleDataStatus);
  });

  it('should be check master status', async () => {
    expect(
      await service.checkStatus({
        currentStatus: 'Open',
        newStatus: 'Confirm',
      }),
    ).toEqual(mockSampleDataStatus);
  });
});
