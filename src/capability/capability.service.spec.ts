import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockId, StringMockId } from '../feature/mocks/feature-payload.mocks';
import { CapabilityService } from './capability.service';
import {
  ArrayOfObjectCapability,
  CapabilityPayload,
  CapabilityPayloadSmallName,
  SuccsessCreateCapability,
  SuccsessGetCapabilityById,
  SuccsessUpdateCapability,
} from './mocks/capability-payload.mocks';
import { CapabilityServiceMock } from './mocks/capability-service.mocks';
import { Capabilities } from './schema/capability.schema';

describe('CapabilityService', () => {
  let service: CapabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CapabilityService,
        {
          provide: getModelToken(Capabilities.name),
          useValue: CapabilityServiceMock,
        },
      ],
    }).compile();

    service = module.get<CapabilityService>(CapabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a capability', async () => {
    expect(await service.create(CapabilityPayload)).toEqual(
      SuccsessCreateCapability,
    );
  });

  it('should update a capability', async () => {
    expect(await service.update(MockId, CapabilityPayload)).toEqual(
      SuccsessUpdateCapability(StringMockId),
    );
  });

  it('should get a capability', async () => {
    expect(await service.findById(MockId)).toEqual(
      SuccsessGetCapabilityById(StringMockId),
    );
  });

  it('should get list of capabilitys', async () => {
    expect(await service.find({ name: 'CREATE' })).toEqual(
      ArrayOfObjectCapability,
    );
  });

  it('should delete a capability', async () => {
    expect(await service.delete(MockId)).toEqual(
      SuccsessGetCapabilityById(StringMockId),
    );
  });
});
