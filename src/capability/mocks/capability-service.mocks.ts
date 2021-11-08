import {
  ArrayOfObjectCapability,
  SuccsessCreateCapability,
} from './capability-payload.mocks';

export const CapabilityServiceMock = {
  // ==================================== service ====================================
  create: jest.fn().mockImplementation((dto) => {
    return { id: expect.anything(), ...dto };
  }),
  findById: jest.fn().mockImplementation((id) => {
    return { id, ...SuccsessCreateCapability };
  }),
  find: jest.fn().mockImplementation(() => {
    return ArrayOfObjectCapability;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation((id, dto) => {
    return { id: id.id, ...dto };
  }),
  findByIdAndDelete: jest.fn().mockImplementation((id) => {
    return { id: id.id, ...SuccsessCreateCapability };
  }),
};
