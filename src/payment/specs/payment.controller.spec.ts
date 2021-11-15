import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';

const AllData = [
  [
    {
      "_id": "61928e3becd9cc9355b767b5",
      "deletedAt": null,
      "paymentTerm": "COD",
      "createdAt": "2021-11-15T16:43:39.301Z",
      "updatedAt": "2021-11-15T16:43:39.301Z"
    },
    {
      "_id": "61928f2509c0d99ab6e1c346",
      "deletedAt": null,
      "paymentTerm": "H+1",
      "createdAt": "2021-11-15T16:47:33.594Z",
      "updatedAt": "2021-11-15T16:47:33.594Z"
    }
  ]
];
const AddDTO = {
  paymentTerm: "COD"
}
const EditDTO = {
  _id: "1",
  paymentTerm: "COD"
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
    expect(await controller.create(AddDTO)).toBe(AddDTO);
  });

  it('should edit payment term', async () => {
    expect(await controller.update(EditDTO)).toBe(EditDTO);
  });

  it('should delete payment term', async () => {
    expect(await controller.delete(DeleteDTO)).toBe(DeleteDTO);
  });

  it('should get all payment term', async () => {
    expect(await controller.getAll()).toBe(AllData);
  });
});
