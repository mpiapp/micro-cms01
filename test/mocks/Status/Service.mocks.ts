import {
  mockSampleDataStatus,
  mockSampleDataStatuses,
} from './Sample-data.mocks';

export const mockStatusService = {
  create: jest.fn().mockReturnValue(mockSampleDataStatus),
  find: jest.fn().mockReturnValue(mockSampleDataStatuses),
  findById: jest.fn().mockReturnValue(mockSampleDataStatus),
  aggregate: jest.fn().mockReturnValue([mockSampleDataStatus]),
  select: jest.fn().mockReturnValue(mockSampleDataStatus),
};
