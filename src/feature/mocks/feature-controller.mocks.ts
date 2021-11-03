import {
  ArrayOfObjecFeature,
  SuccsessCreateFeature,
  SuccsessCreateFeatureWithUndID,
  SuccsessCreateFeatureWithUndIDWithoutCI,
} from './feature-payload.mocks';

export const FeatureControllerMock = {
  // ==================================== controller ====================================
  create: jest.fn().mockImplementation((dto) => {
    return { id: expect.anything(), ...dto };
  }),
  findById: jest.fn().mockImplementation((id) => {
    if (['123', '456'].includes(id))
      return {
        id,
        ...SuccsessCreateFeatureWithUndID,
      };
    if (['234'].includes(id))
      return {
        id,
        ...SuccsessCreateFeatureWithUndIDWithoutCI,
      };
    if (['789'].includes(id)) return null;
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
