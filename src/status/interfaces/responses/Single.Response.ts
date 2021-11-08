import { TStatuses } from '../types/statuses.type';
import { BaseResponse } from './Base.Response';

export interface StatusResponse extends BaseResponse {
  data: TStatuses | null;
}
