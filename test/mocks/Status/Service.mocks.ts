import {
  mockSampleDataStatus,
  mockSampleDataStatuses,
} from './Sample-data.mocks';

export const mockStatusService = {
  create: jest.fn().mockReturnValue(mockSampleDataStatus),
  find: jest.fn().mockReturnValue(mockSampleDataStatuses),
  findOne: jest.fn().mockReturnValue(mockSampleDataStatus),
};
