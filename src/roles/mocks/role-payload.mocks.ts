const stringId = 'id';
const numberId = 1;

export const StringMockId = stringId;

export const MockId = {
  id: stringId,
};

export const RolePayload = {
  name: 'ADMIN',
  flag: 'BUYER',
  module_ids: ['id1'],
};

export const RolePayloadWithRealIdDependency = {
  name: 'ADMIN',
  flag: 'BUYER',
  module_ids: ['6156d97e2fa4157f7cc2217'],
};

export const PayloadOnlyIdDependency = {
  module_ids: ['6156d97e2fa4157f7cc2217'],
};

export const RolePayloadWithAsalIdDependency = {
  name: 'ADMIN',
  flag: 'BUYER',
  module_ids: ['ASAL'],
};

export const IdDependencyAsal = {
  module_ids: ['ASAL'],
};

export const SuccsessCreateRole = {
  id: stringId,
  name: 'ADMIN',
  flag: 'BUYER',
  module_ids: ['id1'],
};

export const SuccsessCreateRoleRealIdDependency = {
  id: stringId,
  name: 'ADMIN',
  flag: 'BUYER',
  module_ids: ['6156d97e2fa4157f7cc2217'],
};

export const SuccsessCreateRoleNoFeature = {
  id: stringId,
  name: 'ADMIN',
};

export const SuccsessGetRoleById = (id) => {
  return {
    id,
    name: 'ADMIN',
    flag: 'BUYER',
    module_ids: ['id1'],
  };
};

export const SuccsessUpdateRole = (id) => {
  return {
    id: id,
    name: 'ADMIN',
    flag: 'BUYER',
    module_ids: ['id1'],
  };
};

export const ArrayOfObjectRole = [
  {
    _id: 'role1',
    name: 'ADMIN',
    flag: 'BUYER',
    module_ids: ['id1', 'id2'],
  },
  {
    _id: 'role2',
    role: 'PICKER',
    flag: 'BUYER',
    module_ids: ['id3'],
  },
  {
    _id: 'role3',
    role: 'SLEEPER',
    flag: 'VEMDOR',
    module_ids: [],
  },
];
