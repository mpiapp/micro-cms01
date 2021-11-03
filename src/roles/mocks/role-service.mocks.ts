import { ArrayOfObjectRole, SuccsessCreateRole } from './role-payload.mocks';

export const RoleServiceMock = {
  // ==================================== service ====================================
  create: jest.fn().mockImplementation((dto) => {
    return { id: expect.anything(), ...dto };
  }),
  findById: jest.fn().mockImplementation((id) => {
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
