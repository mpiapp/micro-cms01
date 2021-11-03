import { TStatus } from '../types/statusCreate.type';
import { Status } from './../../schema/status.schema';

export interface IMasterStatusService {
  save(param: TStatus): Promise<Status>;
  //   getOne(id: string): Promise<Status>;
  //   getAll(): Promise<Status[]>;
  //   update(param: any): Promise<Status>;
  //   delete(id: string): Promise<Status>;
}
