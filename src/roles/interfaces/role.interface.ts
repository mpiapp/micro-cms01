import { CreateRoleDTO } from '../dto/create-role.dto';
import { IdDTO } from '../dto/id.dto';
import { UpdateRoleDTO } from '../dto/update-role.dto';
import { Role } from '../schema/roles.schema';

// use dto
export interface GlobalRoleInterface {
  create(body: CreateRoleDTO): Promise<Role>;
  findById(id: IdDTO): Promise<Role>;
  find(query: any): Promise<Role[]>;
  update(id: IdDTO, body: UpdateRoleDTO);
  delete(id: IdDTO): Promise<Role>;
}
