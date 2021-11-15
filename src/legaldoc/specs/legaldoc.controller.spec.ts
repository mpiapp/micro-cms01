import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LegalDocController } from '../legaldoc.controller';
import { LegalDocService } from '../legaldoc.service';

const AllData = [
  [
    {
      "_id": "61928e3becd9cc9355b767b5",
      "deletedAt": null,
      "LegalDoc": "SIUPP",
      "createdAt": "2021-11-15T16:43:39.301Z",
      "updatedAt": "2021-11-15T16:43:39.301Z"
    },
    {
      "_id": "61928f2509c0d99ab6e1c346",
      "deletedAt": null,
      "LegalDoc": "H+1",
      "createdAt": "2021-11-15T16:47:33.594Z",
      "updatedAt": "2021-11-15T16:47:33.594Z"
    }
  ]
];
const AddDTO = {
  name:"siupp",
  title: "SIUPP"
}
const EditDTO = {
  _id: "1",
  title: "SIUPP"
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

describe('LegalDocController', () => {
  let controller: LegalDocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalDocService, {
        provide: getModelToken('LegalDoc'),
        useValue: RepositoryMock
      }],
      controllers: [LegalDocController],
    }).compile();

    controller = module.get<LegalDocController>(LegalDocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Legal doc', async () => {
    expect(await controller.create(AddDTO)).toBe(AddDTO);
  });

  it('should edit Legal doc', async () => {
    expect(await controller.update(EditDTO)).toBe(EditDTO);
  });

  it('should delete Legal doc', async () => {
    expect(await controller.delete(DeleteDTO)).toBe(DeleteDTO);
  });

  it('should get all Legal doc', async () => {
    expect(await controller.getAll()).toBe(AllData);
  });
});
