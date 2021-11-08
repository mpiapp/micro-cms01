import { TStatus } from '../types/statusCreate.type';
import { TStatusPaginate } from '../types/statusPaginate.type';
import { Status } from './../../schema/status.schema';

export interface IMasterStatusService {
  save(param: TStatus): Promise<Status>;
  getOne(id: string): Promise<Status>;
  getAll(): Promise<Status[]>;
  getPaginate(params: TStatusPaginate): Promise<any>;
  update(id: string, params: TStatus[]): Promise<Status>;
  delete(id: string): Promise<Status>;
}
