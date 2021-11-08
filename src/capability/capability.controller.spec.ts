import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CapabilityController } from './capability.controller';
import { CapabilityService } from './capability.service';
import { CapabilityControllerMock } from './mocks/capability-controller.mocks';
import {
  ArrayOfObjectCapability,
  CapabilityPayload,
  MockId,
  SuccsessCreateCapability,
  SuccsessGetCapabilityById,
  SuccsessUpdateCapability,
} from './mocks/capability-payload.mocks';
import { Capabilities } from './schema/capability.schema';

describe('CapabilityController', () => {
  let controller: CapabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapabilityController],
      providers: [
        CapabilityService,
        {
          provide: getModelToken(Capabilities.name),
          useValue: CapabilityControllerMock,
        },
      ],
    }).compile();

    controller = module.get<CapabilityController>(CapabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should create a capabilities (Controller)`, async () => {
    expect(await controller.create(CapabilityPayload)).toEqual(
      SuccsessCreateCapability,
    );
  });

  it(`should update a capabilities (Controller)`, async () => {
    expect(await controller.update(MockId, CapabilityPayload)).toEqual(
      SuccsessUpdateCapability(MockId.id),
    );
  });

  it(`should get a capabilities (Controller)`, async () => {
    expect(await controller.findById(MockId)).toEqual(
      SuccsessGetCapabilityById(MockId.id),
    );
  });

  it(`should get a list of capabilities (Controller)`, async () => {
    expect(await controller.find('test')).toEqual(ArrayOfObjectCapability);
  });

  it(`should delete a capabilities (Controller)`, async () => {
    expect(await controller.delete(MockId)).toEqual(
      SuccsessGetCapabilityById(MockId.id),
    );
  });
});
