import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypeController } from '../companytype.controller';
import { CompanyTypeService } from '../companytype.service';

const AllData = [
  [
    {
      "_id": "61928e3becd9cc9355b767b5",
      "deletedAt": null,
      "companyType": "COD",
      "createdAt": "2021-11-15T16:43:39.301Z",
      "updatedAt": "2021-11-15T16:43:39.301Z"
    },
    {
      "_id": "61928f2509c0d99ab6e1c346",
      "deletedAt": null,
      "companyType": "H+1",
      "createdAt": "2021-11-15T16:47:33.594Z",
      "updatedAt": "2021-11-15T16:47:33.594Z"
    }
  ]
];
const AddDTO = {
  companyType: "COD"
}
const EditDTO = {
  _id: "1",
  companyType: "COD"
}
const DeleteDTO = {
  _id: "1",
  deletedAt: new Date
}

const RepositoryMock = {
  find: () => {
    return AllData;
  },
  create: (dto) => {
    return dto;
  },
  findOneAndUpdate: (id, dto) => {
    return dto;
  },
}

describe('CompanyTypeController', () => {
  let controller: CompanyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyTypeService, {
        provide: getModelToken('CompanyType'),
        useValue: RepositoryMock
      }],
      controllers: [CompanyTypeController],
    }).compile();

    controller = module.get<CompanyTypeController>(CompanyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Company Type', async () => {
    expect(await controller.create(AddDTO)).toBe(AddDTO);
  });

  it('should edit Company Type', async () => {
    expect(await controller.update(EditDTO)).toBe(EditDTO);
  });

  it('should delete Company Type', async () => {
    expect(await controller.delete(DeleteDTO)).toBe(DeleteDTO);
  });

  it('should get all Company Type', async () => {
    expect(await controller.getAll()).toBe(AllData);
  });
});
