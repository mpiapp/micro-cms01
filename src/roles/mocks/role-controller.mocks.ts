import {
  ArrayOfObjectRole,
  SuccsessCreateRole,
  SuccsessCreateRoleNoFeature,
} from './role-payload.mocks';

export const RoleControllerMock = {
  // ==================================== controller ====================================
  create: jest.fn().mockImplementation((dto) => {
    return { id: expect.anything(), ...dto };
  }),
  findById: jest.fn().mockImplementation((id) => {
    if (id.id == 'NO_FEATURE') return { id, ...SuccsessCreateRoleNoFeature };
    return { id, ...SuccsessCreateRole };
  }),
  find: jest.fn().mockImplementation(() => {
    return ArrayOfObjectRole;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation((id, dto) => {
    return { id: id.id, ...dto };
  }),
  findByIdAndDelete: jest.fn().mockImplementation((id) => {
    return { id: id.id, ...SuccsessCreateRole };
  }),
};
