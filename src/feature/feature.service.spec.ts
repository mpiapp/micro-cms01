import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ArrayOfObjecFeature,
  MockId,
  SuccsessGetFeatureById,
  SuccsessUpdateFeature,
  StringMockId,
  FeaturePayload,
  SuccsessCreateFeature,
  FeaturePayloadOnlyCapabilityIds,
  FeaturePayloadOnlyName,
  SuccsessUpdateFeatureOnlyCapabilityIds,
  SuccsessUpdateFeatureOnlyName,
} from './mocks/feature-payload.mocks';
import { Feature } from './schema/feature.schema';
import { FeatureService } from './feature.service';
import { FeatureServiceMock } from './mocks/feature-service.mocks';
import { CapabilityService } from '../capability/capability.service';
import { CapabilityServiceMock } from '../capability/mocks/capability-service.mocks';
import { Capabilities } from '../capability/schema/capability.schema';
import { SuccsessGetCapabilityById } from '../capability/mocks/capability-payload.mocks';

describe('FeatureService', () => {
  let service: FeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureService,
        {
          provide: getModelToken(Feature.name),
          useValue: FeatureServiceMock,
        },
        CapabilityService,
        {
          provide: getModelToken(Capabilities.name),
          useValue: CapabilityServiceMock,
        },
      ],
    }).compile();

    service = module.get<FeatureService>(FeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not create a feature if there are no permission', async () => {
    expect(await service.create(FeaturePayload)).toEqual(SuccsessCreateFeature);
  });

  it('should create a feature', async () => {
    expect(await service.create(FeaturePayload)).toEqual(SuccsessCreateFeature);
  });

  it('should update a feature', async () => {
    expect(await service.update(MockId, FeaturePayload)).toEqual(
      SuccsessUpdateFeature(StringMockId),
    );
    expect(
      await service.update(MockId, FeaturePayloadOnlyCapabilityIds),
    ).toEqual(SuccsessUpdateFeatureOnlyCapabilityIds(StringMockId));
    expect(await service.update(MockId, FeaturePayloadOnlyName)).toEqual(
      SuccsessUpdateFeatureOnlyName(StringMockId),
    );
  });

  it('should get a feature', async () => {
    expect(await service.findById(MockId)).toEqual(
      SuccsessGetFeatureById(StringMockId),
    );
  });

  it('should get list of features', async () => {
    expect(await service.find({ name: 'test' })).toEqual(ArrayOfObjecFeature);
  });

  it('should delete a feature', async () => {
    expect(await service.delete(MockId)).toEqual(
      SuccsessGetFeatureById(StringMockId),
    );
  });

  it('should get list of capabilities', async () => {
    expect(await service.findCapabilityById(MockId)).toEqual(
      SuccsessGetCapabilityById(StringMockId),
    );
  });
});
