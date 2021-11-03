import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Feature } from '../feature/schema/feature.schema';
import { FeatureService } from '../feature/feature.service';
import {
  ArrayOfObjectRole,
  MockId,
  RolePayload,
  StringMockId,
  SuccsessCreateRole,
  IdDependencyAsal,
  SuccsessGetRoleById,
  SuccsessUpdateRole,
  RolePayloadWithRealIdDependency,
  PayloadOnlyIdDependency,
  RolePayloadWithAsalIdDependency,
  SuccsessCreateRoleRealIdDependency,
} from './mocks/role-payload.mocks';
import { RoleServiceMock } from './mocks/role-service.mocks';
import { RolesService } from './roles.service';
import { Role } from './schema/roles.schema';
import { FeatureServiceMock } from '../feature/mocks/feature-service.mocks';
import { CapabilityService } from '../capability/capability.service';
import { CapabilityServiceMock } from '../capability/mocks/capability-service.mocks';
import { Capabilities } from '../capability/schema/capability.schema';
import { NavigationService } from '../navigation/navigation.service';
import { Module } from '../navigation/schema/navigation.schema';
import { NavigationServiceMock } from '../navigation/mocks/navigation-service.mocks';
import {
  ArrayOfObjectNavigation,
  SuccsessGetNavigationById,
} from '../navigation/mocks/navigation-payload.mocks';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Role.name),
          useValue: RoleServiceMock,
        },
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

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a role', async () => {
    expect(await service.create(RolePayload)).toEqual(SuccsessCreateRole);
  });

  it('should update a role', async () => {
    expect(await service.update(MockId, RolePayload)).toEqual(
      SuccsessUpdateRole(StringMockId),
    );
  });

  it('should get a role', async () => {
    expect(await service.findById(MockId)).toEqual(
      SuccsessGetRoleById(StringMockId),
    );
  });

  it('should get list of roles', async () => {
    expect(await service.find({ name: 'test' })).toEqual(ArrayOfObjectRole);
  });

  it('should delete a role', async () => {
    expect(await service.delete(MockId)).toEqual(
      SuccsessGetRoleById(StringMockId),
    );
  });

  it('should create a role & its dependency', async () => {
    expect(await service.create_dep(RolePayloadWithRealIdDependency)).toEqual(
      SuccsessCreateRoleRealIdDependency,
    );
  });

  it('should not create a role & its dependency when default feature empty', async () => {
    expect(await service.create_dep(RolePayloadWithAsalIdDependency)).toEqual(
      '',
    );
  });

  it('should update a role & its dependency when role sent', async () => {
    expect(
      await service.update_dep(MockId, RolePayloadWithRealIdDependency),
    ).toEqual(SuccsessUpdateRole(StringMockId));
  });

  it('should update a role & its dependency when role not sent', async () => {
    expect(await service.update_dep(MockId, PayloadOnlyIdDependency)).toEqual(
      SuccsessUpdateRole(StringMockId),
    );
  });

  it('should not update a role & its dependency when feature id false', async () => {
    expect(await service.update_dep(MockId, IdDependencyAsal)).toEqual('');
  });

  it('should get list of modules', async () => {
    expect(await service.findModules()).toEqual(ArrayOfObjectNavigation);
  });

  it('should get a module by id', async () => {
    expect(await service.findModuleById(MockId)).toEqual(
      SuccsessGetNavigationById(StringMockId),
    );
  });
});
