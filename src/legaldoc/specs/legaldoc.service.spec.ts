import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LegalDocService } from '../legaldoc.service';

const RepositoryMock = {}

describe('LegalDocService', () => {
  let service: LegalDocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalDocService, {
        provide: getModelToken('LegalDoc'),
        useValue: RepositoryMock
      }],
    }).compile();

    service = module.get<LegalDocService>(LegalDocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
