const stringId = 'id';
const numberId = 1;

export const StringMockId = stringId;

export const MockId = {
  id: stringId,
};

export const CapabilityPayload = {
  name: 'CREATE',
};

export const CapabilityPayloadSmallName = {
  name: 'Create',
};

export const SuccsessCreateCapability = {
  id: stringId,
  name: 'CREATE',
};

export const SuccsessCreateCapabilityWithUndID = {
  _id: stringId,
  id: stringId,
  name: 'CREATE',
};

export const SuccsessGetCapabilityById = (id) => {
  return {
    id,
    name: 'CREATE',
  };
};

export const SuccsessUpdateCapability = (id) => {
  return {
    id: id,
    name: 'CREATE',
  };
};

export const ArrayOfObjectCapability = [
  {
    name: 'CREATE',
  },
  {
    name: 'UPDATE',
  },
  {
    name: 'DELETE',
  },
];
