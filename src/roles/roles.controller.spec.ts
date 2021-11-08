import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Feature } from '../feature/schema/feature.schema';
import { FeatureService } from '../feature/feature.service';
import { RoleControllerMock } from './mocks/role-controller.mocks';
import {
  ArrayOfObjectRole,
  StringMockId,
  MockId,
  RolePayload,
  SuccsessCreateRole,
  SuccsessGetRoleById,
  SuccsessUpdateRole,
  RolePayloadWithRealIdDependency,
  RolePayloadWithAsalIdDependency,
  PayloadOnlyIdDependency,
  IdDependencyAsal,
  SuccsessCreateRoleRealIdDependency,
} from './mocks/role-payload.mocks';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './schema/roles.schema';
import { FeatureControllerMock } from '../feature/mocks/feature-controller.mocks';
import { CapabilityService } from '../capability/capability.service';
import { CapabilityControllerMock } from '../capability/mocks/capability-controller.mocks';
import { Capabilities } from '../capability/schema/capability.schema';
import { NavigationControllerMock } from '../navigation/mocks/navigation-controller.mocks';
import { NavigationService } from '../navigation/navigation.service';
import { Module } from '../navigation/schema/navigation.schema';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: getModelToken(Role.name),
          useValue: RoleControllerMock,
        },
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

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should create a role (Controller)`, async () => {
    expect(await controller.create(RolePayload)).toEqual(SuccsessCreateRole);
  });

  it(`should update a role (Controller)`, async () => {
    expect(await controller.update(MockId, RolePayload)).toEqual(
      SuccsessUpdateRole(MockId.id),
    );
  });

  it(`should get a role (Controller)`, async () => {
    expect(await controller.findById(MockId)).toEqual(
      SuccsessGetRoleById(MockId.id),
    );
  });

  it(`should get a list of roles (Controller)`, async () => {
    expect(await controller.find('test')).toEqual(ArrayOfObjectRole);
  });

  it(`should delete a role (Controller)`, async () => {
    expect(await controller.delete(MockId)).toEqual(
      SuccsessGetRoleById(MockId.id),
    );
  });

  it(`should create a role with dependency (Controller)`, async () => {
    expect(await controller.createdep(RolePayloadWithRealIdDependency)).toEqual(
      SuccsessCreateRoleRealIdDependency,
    );
  });

  it('should not create a role & its dependency when default feature empty (Controller)', async () => {
    try {
      await controller.createdep(RolePayloadWithAsalIdDependency);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should update a role & its dependency when role sent (Controller)', async () => {
    expect(
      await controller.update_dep(MockId, RolePayloadWithRealIdDependency),
    ).toEqual(SuccsessCreateRole);
  });

  it('should update a role & its dependency when role not sent (Controller)', async () => {
    expect(
      await controller.update_dep(MockId, PayloadOnlyIdDependency),
    ).toEqual(SuccsessUpdateRole(StringMockId));
  });

  it('should not update a role & its dependency when feature id false (Controller)', async () => {
    try {
      await controller.update_dep(MockId, IdDependencyAsal);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it(`should get a list of features by send role ID (Controller)`, async () => {
    const test = await controller.find_dep({ id: 'id' });
    expect(test).toEqual([
      { _id: 'id1', isTrue: true, name: 'MENU_BAR' },
      { _id: 'id2', isTrue: false, name: 'ADMIN_BAR' },
      { _id: 'id3', isTrue: false, name: 'BUYER_BAR' },
    ]);
  });

  it(`should get a list of features by send role ID even when there are no feature ids(Controller)`, async () => {
    const test = await controller.find_dep({ id: 'NO_FEATURE' });
    expect(test).toEqual([
      { _id: 'id1', isTrue: false, name: 'MENU_BAR' },
      { _id: 'id2', isTrue: false, name: 'ADMIN_BAR' },
      { _id: 'id3', isTrue: false, name: 'BUYER_BAR' },
    ]);
  });

  it(`should get a list of modules (Controller)`, async () => {
    const test = await controller.findModules();
    expect(test).toEqual([
      {
        _id: 'role1',
        flag: 'BUYER',
        modules: [
          {
            _id: 'id',
            feature_ids: undefined,
            link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
            name: 'MENU_BAR',
          },
          {
            _id: 'id',
            feature_ids: undefined,
            link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
            name: 'MENU_BAR',
          },
        ],
        name: 'ADMIN',
      },
      { _id: 'role2', flag: 'BUYER', modules: [], name: undefined },
      { _id: 'role3', flag: 'VEMDOR', modules: [], name: undefined },
    ]);
  });
});
