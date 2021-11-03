import { TStatusUpdate } from '../types/statusUpdate.type';
import { Status } from './../../schema/status.schema';

export interface IConfigStatusService {
  assign(param: TStatusUpdate): Promise<Status>;
  unassign(param: TStatusUpdate): Promise<Status>;
}
