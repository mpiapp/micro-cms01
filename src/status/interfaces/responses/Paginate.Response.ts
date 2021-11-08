import { TStatuses } from '../types/statuses.type';

export interface StatusPaginateResponse {
  count: number;
  limit: number;
  page: number;
  data: TStatuses[] | null;
}
