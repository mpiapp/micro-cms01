import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SuccsessGetFeatureById } from '../feature/mocks/feature-payload.mocks';
import { CapabilityService } from '../capability/capability.service';
import { CapabilityServiceMock } from '../capability/mocks/capability-service.mocks';
import { Capabilities } from '../capability/schema/capability.schema';
import { FeatureService } from '../feature/feature.service';
import { FeatureServiceMock } from '../feature/mocks/feature-service.mocks';
import { Feature } from '../feature/schema/feature.schema';
import {
  ArrayOfObjectNavigation,
  MockId,
  NavigationPayload,
  SuccsessCreateNavigation,
  SuccsessGetNavigationById,
  SuccsessUpdateNavigation,
  StringMockId,
} from './mocks/navigation-payload.mocks';
import { NavigationServiceMock } from './mocks/navigation-service.mocks';
import { NavigationService } from './navigation.service';
import { Module } from './schema/navigation.schema';
import { SuccsessGetCapabilityById } from '../capability/mocks/capability-payload.mocks';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NavigationService,
        {
          provide: getModelToken(Module.name),
          useValue: NavigationServiceMock,
        },
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

    service = module.get<NavigationService>(NavigationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a navigation', async () => {
    expect(await service.create(NavigationPayload)).toEqual(
      SuccsessCreateNavigation,
    );
  });

  it('should update a navigation', async () => {
    expect(await service.update(MockId, NavigationPayload)).toEqual(
      SuccsessUpdateNavigation(StringMockId),
    );
  });

  it('should get a navigation', async () => {
    expect(await service.findById(MockId)).toEqual(
      SuccsessGetNavigationById(StringMockId),
    );
  });

  it('should get list of navigations', async () => {
    expect(await service.find({ name: 'test' })).toEqual(
      ArrayOfObjectNavigation,
    );
  });

  it('should delete a navigation', async () => {
    expect(await service.delete(MockId)).toEqual(
      SuccsessGetNavigationById(StringMockId),
    );
  });

  it('should get a feature', async () => {
    expect(await service.findFeatureById(MockId)).toEqual(
      SuccsessGetFeatureById(StringMockId),
    );
  });

  it('should get a capability', async () => {
    expect(await service.findCapabilityById(MockId)).toEqual(
      SuccsessGetCapabilityById(StringMockId),
    );
  });
});
