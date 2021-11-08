import { Test, TestingModule } from '@nestjs/testing';
import { BuyerOrVendorRule, FeaturesMongoIdRule } from './custom-validator';

describe('Mongo Id Rule Validator', () => {
  let controller: FeaturesMongoIdRule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturesMongoIdRule],
      providers: [
        FeaturesMongoIdRule,
        {
          provide: FeaturesMongoIdRule,
          useValue: FeaturesMongoIdRule,
        },
      ],
    }).compile();

    controller = module.get<FeaturesMongoIdRule>(FeaturesMongoIdRule);
  });

  it('custom validator should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should return a default message when failed`, () => {
    expect(controller.defaultMessage()).toEqual(`ID doesn't exist`);
  });

  it(`should return true when id inside mongo id`, () => {
    expect(controller.validate(['615562b1925221106e840903'])).toBeTruthy();
  });

  it(`should return false when id inside is not mongo id`, async () => {
    expect(await controller.validate(['615562b1925221106e8409'])).toBeFalsy();
  });
});

describe('Vendor or Buyer Rule Validator', () => {
  let controllerBV: BuyerOrVendorRule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyerOrVendorRule],
      providers: [
        BuyerOrVendorRule,
        {
          provide: BuyerOrVendorRule,
          useValue: BuyerOrVendorRule,
        },
      ],
    }).compile();

    controllerBV = module.get<BuyerOrVendorRule>(BuyerOrVendorRule);
  });

  it('custom validator should be defined', () => {
    expect(controllerBV).toBeDefined();
  });

  it(`should return a default message when failed`, () => {
    expect(controllerBV.defaultMessage()).toEqual(
      `Flag must be one of VENDOR or BUYER`,
    );
  });

  it(`should return true when inside BUYER or VENDOR`, () => {
    expect(controllerBV.validate(['BUYER'])).toBeTruthy();
  });

  it(`should return false when inside is not BUYER or VENDOR`, async () => {
    expect(await controllerBV.validate(['BUYER123'])).toBeFalsy();
  });
});
