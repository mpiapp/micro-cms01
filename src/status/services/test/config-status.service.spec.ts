import { Test, TestingModule } from '@nestjs/testing';
import { ConfigStatusService } from '../config-status.service';

describe('ConfigStatusService', () => {
  let service: ConfigStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigStatusService],
    }).compile();

    service = module.get<ConfigStatusService>(ConfigStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
