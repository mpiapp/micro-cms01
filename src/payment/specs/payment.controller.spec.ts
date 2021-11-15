import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';

const dto = {
  term: "COD"
}

const RepositoryMock = {
  create: (dto) => {
    return dto;
  }
}

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, {
        provide: getModelToken('Payment'),
        useValue: RepositoryMock
      }],
      controllers: [PaymentController],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should crate payment term', async () => {
    expect(await controller.create(dto)).toBe(dto);
  });
});
