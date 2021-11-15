import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyCategoryService } from '../companycategory.service';

const RepositoryMock = {}

describe('CompanyCategoryService', () => {
  let service: CompanyCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyCategoryService, {
        provide: getModelToken('CompanyCategory'),
        useValue: RepositoryMock
      }],
    }).compile();

    service = module.get<CompanyCategoryService>(CompanyCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
