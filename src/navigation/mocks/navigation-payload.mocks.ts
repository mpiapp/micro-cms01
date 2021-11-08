const stringId = 'id';
const numberId = 1;

export const StringMockId = stringId;

export const MockId = {
  id: stringId,
};

export const NavigationPayload = {
  name: 'MENU_BAR',
  link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
  flag: 'VENDOR',
};

export const SuccsessCreateNavigation = {
  id: stringId,
  name: 'MENU_BAR',
  link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
  flag: 'VENDOR',
};

export const SuccsessCreateNavigationUnId = {
  _id: stringId,
  name: 'MENU_BAR',
  link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
  flag: 'VENDOR',
};

export const SuccsessGetNavigationById = (id) => {
  return {
    id,
    name: 'MENU_BAR',
    link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
    flag: 'VENDOR',
  };
};

export const SuccsessUpdateNavigation = (id) => {
  return {
    id,
    name: 'MENU_BAR',
    link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
    flag: 'VENDOR',
  };
};

export const ArrayOfObjectNavigation = [
  {
    _id: 'id1',
    name: 'MENU_BAR',
    link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
    flag: 'VENDOR',
    feature_ids: [],
  },
  {
    _id: 'id2',
    name: 'ADMIN_BAR',
    link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
    flag: 'BUYER',
    feature_ids: ['123'],
  },
  {
    _id: 'id3',
    name: 'BUYER_BAR',
    link: 'https://www.google.com/webhp?ie=UTF-8&rct=j',
    flag: 'BUYER',
    feature_ids: ['123', '234', '789'],
  },
];
