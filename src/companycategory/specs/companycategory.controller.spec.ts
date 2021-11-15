import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyCategoryController } from '../companycategory.controller';
import { CompanyCategoryService } from '../companycategory.service';

const AllData = [
  [
    {
      "_id": "61928e3becd9cc9355b767b5",
      "deletedAt": null,
      "category": "Telekomunikasi",
      "createdAt": "2021-11-15T16:43:39.301Z",
      "updatedAt": "2021-11-15T16:43:39.301Z"
    },
    {
      "_id": "61928f2509c0d99ab6e1c346",
      "deletedAt": null,
      "category": "Keuangan",
      "createdAt": "2021-11-15T16:47:33.594Z",
      "updatedAt": "2021-11-15T16:47:33.594Z"
    }
  ]
];
const AddDTO = {
  category: "Keuangan"
}
const EditDTO = {
  _id: "1",
  category: "Keuangan"
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

describe('CompanyCategoryController', () => {
  let controller: CompanyCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyCategoryService, {
        provide: getModelToken('CompanyCategory'),
        useValue: RepositoryMock
      }],
      controllers: [CompanyCategoryController],
    }).compile();

    controller = module.get<CompanyCategoryController>(CompanyCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Company Category', async () => {
    expect(await controller.create(AddDTO)).toBe(AddDTO);
  });

  it('should edit Company Category', async () => {
    expect(await controller.update(EditDTO)).toBe(EditDTO);
  });

  it('should delete Company Category', async () => {
    expect(await controller.delete(DeleteDTO)).toBe(DeleteDTO);
  });

  it('should get all Company Category', async () => {
    expect(await controller.getAll()).toBe(AllData);
  });
});
