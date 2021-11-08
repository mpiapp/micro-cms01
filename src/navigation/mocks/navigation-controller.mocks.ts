import {
  ArrayOfObjectNavigation,
  SuccsessCreateNavigation,
  SuccsessCreateNavigationUnId,
} from './navigation-payload.mocks';

export const NavigationControllerMock = {
  // ==================================== controller ====================================
  create: jest.fn().mockImplementation((dto) => {
    return { id: expect.anything(), ...dto };
  }),
  findById: jest.fn().mockImplementation((id) => {
    if (id == 'ASAL') return '';
    if (['id1', 'id2'].includes(id)) return SuccsessCreateNavigationUnId;
    if (['id3'].includes(id)) return null;
    return { id, ...SuccsessCreateNavigation };
  }),
  find: jest.fn().mockImplementation(() => {
    return ArrayOfObjectNavigation;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation((id, dto) => {
    return { id: id.id, ...dto };
  }),
  findByIdAndDelete: jest.fn().mockImplementation((id) => {
    return { id: id.id, ...SuccsessCreateNavigation };
  }),
};
