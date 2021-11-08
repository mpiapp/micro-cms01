import {
  ArrayOfObjectCapability,
  SuccsessCreateCapability,
  SuccsessCreateCapabilityWithUndID,
} from './capability-payload.mocks';

export const CapabilityControllerMock = {
  // ==================================== controller ====================================
  create: jest.fn().mockImplementation((dto) => {
    return { id: expect.anything(), ...dto };
  }),
  findById: jest.fn().mockImplementation((id) => {
    if (['id1', 'id2', 'id4'].includes(id))
      return {
        id,
        ...SuccsessCreateCapabilityWithUndID,
      };
    if (['id5'].includes(id)) return null;
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
