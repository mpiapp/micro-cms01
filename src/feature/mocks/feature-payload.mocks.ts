const stringId = 'id';
const numberId = 1;

export const StringMockId = stringId;

export const MockId = {
  id: stringId,
};

export const FeaturePayload = {
  name: 'COMPANY_PROFILE',
  capability_ids: ['id1', 'id2'],
  flag: 'BUYER',
};

export const FeaturePayloadOnlyName = {
  name: 'COMPANY_PROFILE',
  flag: 'BUYER',
};

export const FeaturePayloadOnlyCapabilityIds = {
  capability_ids: ['id1', 'id2'],
  flag: 'BUYER',
};

export const SuccsessCreateFeature = {
  id: stringId,
  name: 'COMPANY_PROFILE',
  capability_ids: ['id1', 'id2'],
  flag: 'BUYER',
};

export const SuccsessCreateFeatureWithUndID = {
  _id: stringId,
  id: stringId,
  name: 'COMPANY_PROFILE',
  capability_ids: ['id1', 'id2'],
  flag: 'BUYER',
};

export const SuccsessCreateFeatureWithUndIDWithoutCI = {
  _id: stringId,
  id: stringId,
  name: 'COMPANY_PROFILE',
  capability_ids: [],
  flag: 'BUYER',
};

export const SuccsessGetFeatureById = (id) => {
  return {
    id,
    name: 'COMPANY_PROFILE',
    capability_ids: ['id1', 'id2'],
    flag: 'BUYER',
  };
};

export const SuccsessUpdateFeature = (id) => {
  return {
    id: id,
    name: 'COMPANY_PROFILE',
    capability_ids: ['id1', 'id2'],
    flag: 'BUYER',
  };
};

export const SuccsessUpdateFeatureOnlyCapabilityIds = (id) => {
  return {
    id: id,
    capability_ids: ['id1', 'id2'],
    flag: 'BUYER',
  };
};

export const SuccsessUpdateFeatureOnlyName = (id) => {
  return {
    id: id,
    name: 'COMPANY_PROFILE',
    flag: 'BUYER',
  };
};

export const ArrayOfObjecFeature = [
  {
    _id: '123',
    name: 'COMPANY_PROFILE',
    capability_ids: ['id1', 'id2'],
    flag: 'BUYER',
  },
  {
    _id: '234',
    name: 'BUYER_STATUS',
    capability_ids: [],
    flag: 'BUYER',
  },
  {
    _id: '456',
    name: 'MANAGE_BUYER',
    capability_ids: ['id4', 'id5'],
    flag: 'VENDOR',
  },
  {
    _id: '789',
    name: 'MANAGE_VENDOR',
    capability_ids: [],
    flag: 'VENDOR',
  },
];
