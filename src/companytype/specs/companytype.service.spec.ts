import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypeService } from '../companytype.service';

const RepositoryMock = {}

describe('CompanyTypeService', () => {
  let service: CompanyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyTypeService, {
        provide: getModelToken('CompanyType'),
        useValue: RepositoryMock
      }],
    }).compile();

    service = module.get<CompanyTypeService>(CompanyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
