import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityService } from '../capability/capability.service';
import { CapabilityControllerMock } from '../capability/mocks/capability-controller.mocks';
import { Capabilities } from '../capability/schema/capability.schema';
import { FeatureService } from '../feature/feature.service';
import { FeatureControllerMock } from '../feature/mocks/feature-controller.mocks';
import { Feature } from '../feature/schema/feature.schema';
import { NavigationControllerMock } from './mocks/navigation-controller.mocks';
import {
  ArrayOfObjectNavigation,
  MockId,
  NavigationPayload,
  SuccsessCreateNavigation,
  SuccsessGetNavigationById,
  SuccsessUpdateNavigation,
} from './mocks/navigation-payload.mocks';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { Module } from './schema/navigation.schema';

describe('NavigationController', () => {
  let controller: NavigationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavigationController],
      providers: [
        NavigationService,
        {
          provide: getModelToken(Module.name),
          useValue: NavigationControllerMock,
        },
        FeatureService,
        {
          provide: getModelToken(Feature.name),
          useValue: FeatureControllerMock,
        },
        CapabilityService,
        {
          provide: getModelToken(Capabilities.name),
          useValue: CapabilityControllerMock,
        },
      ],
    }).compile();

    controller = module.get<NavigationController>(NavigationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should create a navigation (Controller)`, async () => {
    expect(await controller.create(NavigationPayload)).toEqual(
      SuccsessCreateNavigation,
    );
  });

  it(`should update a navigation (Controller)`, async () => {
    expect(await controller.update(MockId, NavigationPayload)).toEqual(
      SuccsessUpdateNavigation(MockId.id),
    );
  });

  it(`should get a navigation (Controller)`, async () => {
    expect(await controller.findById(MockId)).toEqual(
      SuccsessGetNavigationById(MockId.id),
    );
  });

  it(`should get a list of navigation (Controller)`, async () => {
    expect(await controller.find('test')).toEqual(ArrayOfObjectNavigation);
  });

  it(`should delete a navigation (Controller)`, async () => {
    expect(await controller.delete(MockId)).toEqual(
      SuccsessGetNavigationById(MockId.id),
    );
  });

  it(`should get a list of features and it's capabilities (Controller)`, async () => {
    const test = await controller.findFeatures();
    expect(test).toEqual([
      {
        _id: 'id1',
        features: [],
        flag: 'VENDOR',
        link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
        name: 'MENU_BAR',
      },
      {
        _id: 'id2',
        features: [
          {
            _id: 'id',
            capability_ids: ['id1', 'id2'],
            name: 'COMPANY_PROFILE',
          },
        ],
        flag: 'BUYER',
        link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
        name: 'ADMIN_BAR',
      },
      {
        _id: 'id3',
        features: [
          {
            _id: 'id',
            capability_ids: ['id1', 'id2'],
            name: 'COMPANY_PROFILE',
          },
          { _id: 'id', capability_ids: [], name: 'COMPANY_PROFILE' },
        ],
        flag: 'BUYER',
        link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
        name: 'BUYER_BAR',
      },
    ]);
  });
});
