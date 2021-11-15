import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLegalDocService } from '../companylegaldoc.service';

const RepositoryMock = {}

describe('LegalDocService', () => {
  let service: CompanyLegalDocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyLegalDocService, {
        provide: getModelToken('CompanyLegalDoc'),
        useValue: RepositoryMock
      }],
    }).compile();

    service = module.get<CompanyLegalDocService>(CompanyLegalDocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
