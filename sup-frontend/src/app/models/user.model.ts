import { Role } from "./role.model";
import { RoleTemp } from "./roletemp.model";

export class User {
    id: string;
    username:string;
    email: string;
    password: string;
    role:Role;
    rolesTemp:RoleTemp[];
  }