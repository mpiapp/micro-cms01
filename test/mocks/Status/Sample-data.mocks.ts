export const mockSampleDataStatus = {
  id: expect.any(String),
  name: 'Open',
  next: [],
};

export const mockSampleDataStatuses = [
  {
    id: expect.any(String),
    name: 'Open',
    next: [
      {
        id: expect.any(String),
        name: 'Complate',
      },
    ],
  },
  {
    id: expect.any(String),
    name: 'Complate',
    next: [
      {
        id: expect.any(String),
        name: 'Open',
      },
    ],
  },
  {
    id: expect.any(String),
    name: 'Cancel',
    next: [],
  },
];
