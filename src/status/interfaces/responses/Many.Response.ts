import { TStatuses } from '../types/statuses.type';
import { BaseResponse } from './Base.Response';

export interface StatusesResponse extends BaseResponse {
  data: TStatuses[] | null;
}
