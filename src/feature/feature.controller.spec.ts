import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityService } from '../capability/capability.service';
import { CapabilityControllerMock } from '../capability/mocks/capability-controller.mocks';
import { Capabilities } from '../capability/schema/capability.schema';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';
import { FeatureControllerMock } from './mocks/feature-controller.mocks';
import { ArrayOfObjecFeature, FeaturePayload, MockId, SuccsessCreateFeature, SuccsessGetFeatureById, SuccsessUpdateFeature } from './mocks/feature-payload.mocks';
import { Feature } from './schema/feature.schema';

describe('FeatureController', () => {
  let controller: FeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureController],
      providers: [
      FeatureService, {
        provide: getModelToken(Feature.name),
        useValue: FeatureControllerMock
      },
      CapabilityService, {
        provide: getModelToken(Capabilities.name),
        useValue: CapabilityControllerMock
      }
    ]
    }).compile();

    controller = module.get<FeatureController>(FeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should create a feature (Controller)`, async () => {
    expect(await controller.create(FeaturePayload)).toEqual(SuccsessCreateFeature)
  })

  it(`should update a feature (Controller)`, async () => {
    expect(await controller.update(MockId, FeaturePayload)).toEqual(SuccsessUpdateFeature(MockId.id))
  })

  it(`should get a feature (Controller)`, async () => {
    expect(await controller.findById(MockId)).toEqual(SuccsessGetFeatureById(MockId.id))
  })

  it(`should get a list of features (Controller)`, async () => {
    expect(await controller.find('test')).toEqual(ArrayOfObjecFeature)
  })

  it(`should delete a feature (Controller)`, async () => {
    expect(await controller.delete(MockId)).toEqual(SuccsessGetFeatureById(MockId.id))
  })

  it(`should get a list of features and it's capabilities (Controller)`, async () => {
    var test = await controller.find_cap()
    expect(test).toEqual([{"capabilities": [{"_id": "id", "name": "CREATE"}, {"_id": "id", "name": "CREATE"}], "id": "123", "name": "COMPANY_PROFILE"}, {"capabilities": [], "id": "123", "name": "BUYER_STATUS"}, {"capabilities": [{"_id": "id", "name": "CREATE"}, {"_id": "id", "name": "CREATE"}], "id": "123", "name": "MANAGE_BUYER"}])
  })
});
