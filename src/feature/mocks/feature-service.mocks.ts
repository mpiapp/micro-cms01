import {
  ArrayOfObjecFeature,
  SuccsessCreateFeature,
} from './feature-payload.mocks';

export const FeatureServiceMock = {
  // ==================================== controller ====================================
  create: jest.fn().mockImplementation((dto) => {
    return { id: expect.anything(), ...dto };
  }),
  findById: jest.fn().mockImplementation((id) => {
    return { id, ...SuccsessCreateFeature };
  }),
  find: jest.fn().mockImplementation(() => {
    return ArrayOfObjecFeature;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation((id, dto) => {
    return { id: id.id, ...dto };
  }),
  findByIdAndDelete: jest.fn().mockImplementation((id) => {
    return { id: id.id, ...SuccsessCreateFeature };
  }),
};
