import { Injectable } from '@nestjs/common';
import {
  isMongoId,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class FeaturesMongoIdRule implements ValidatorConstraintInterface {
  async validate(features: string[]) {
    for (const element in features) {
      if (!isMongoId(features[element])) return false;
    }
    return true;
  }

  defaultMessage() {
    return `ID doesn't exist`;
  }
}

@ValidatorConstraint({ name: 'Buyer Or Vendor', async: true })
@Injectable()
export class BuyerOrVendorRule implements ValidatorConstraintInterface {
  async validate(buyer_vendor: string[]) {
    for (const element in buyer_vendor) {
      if (!['BUYER', 'VENDOR'].includes(buyer_vendor[element])) return false;
    }
    return true;
  }

  defaultMessage() {
    return `Flag must be one of VENDOR or BUYER`;
  }
}
