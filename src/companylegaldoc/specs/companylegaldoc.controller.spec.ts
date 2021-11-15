import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLegalDocController } from '../companylegaldoc.controller';
import { CompanyLegalDocService } from '../companylegaldoc.service';

const AllData = [
  [
    {
      "_id": "6192b28d10f71b7fa73994f2",
      "deletedAt": null,
      "legalDoc": [
        {
          "name": "siupp",
          "title": "SIUPP",
          "isRequired": true
        },
        {
          "name": "tdp",
          "title": "TDP",
          "isRequired": true
        },
        {
          "name": "npwp",
          "title": "NPWP",
          "isRequired": true
        },
        {
          "name": "akta",
          "title": "Akta",
          "isRequired": false
        }
      ],
      "companyType": "PT",
      "createdAt": "2021-11-15T19:18:37.360Z",
      "updatedAt": "2021-11-15T19:18:37.360Z"
    },
    {
      "_id": "6192b30432bebc2d5a152a7f",
      "deletedAt": null,
      "legalDoc": [
        {
          "name": "siupp",
          "title": "SIUPP",
          "isRequired": true
        },
        {
          "name": "tdp",
          "title": "TDP",
          "isRequired": false
        },
        {
          "name": "npwp",
          "title": "NPWP",
          "isRequired": true
        },
        {
          "name": "akta",
          "title": "Akta",
          "isRequired": false
        }
      ],
      "companyType": "CV",
      "createdAt": "2021-11-15T19:20:36.476Z",
      "updatedAt": "2021-11-15T19:20:36.476Z"
    }
  ]
];
const AddDTO = {
  "companyType": "CV",
  "legalDoc": [
    {
      "name": "siupp",
      "title":"SIUPP",
      "isRequired":true
    },
    {
      "name": "tdp",
      "title":"TDP",
      "isRequired":false
    },
   {
      "name": "npwp",
      "title":"NPWP",
      "isRequired":true
    },
   {
      "name": "akta",
      "title":"Akta",
      "isRequired":false
    }
  ]
}
const EditDTO = {
  "_id":"1",
  "companyType": "CV",
  "legalDoc": [
    {
      "name": "siupp",
      "title":"SIUPP",
      "isRequired":true
    },
    {
      "name": "tdp",
      "title":"TDP",
      "isRequired":false
    },
   {
      "name": "npwp",
      "title":"NPWP",
      "isRequired":true
    },
   {
      "name": "akta",
      "title":"Akta",
      "isRequired":false
    }
  ]
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
  let controller: CompanyLegalDocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyLegalDocService, {
        provide: getModelToken('CompanyLegalDoc'),
        useValue: RepositoryMock
      }],
      controllers: [CompanyLegalDocController],
    }).compile();

    controller = module.get<CompanyLegalDocController>(CompanyLegalDocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should mapping Company Type X Legal doc', async () => {
    expect(await controller.create(AddDTO)).toBe(AddDTO);
  });

  it('should edit mapping Company Type X Legal doc', async () => {
    expect(await controller.update(EditDTO)).toBe(EditDTO);
  });

  it('should delete Legal doc', async () => {
    expect(await controller.delete(DeleteDTO)).toBe(DeleteDTO);
  });

  it('should get all Legal doc', async () => {
    expect(await controller.getAll()).toBe(AllData);
  });
});
