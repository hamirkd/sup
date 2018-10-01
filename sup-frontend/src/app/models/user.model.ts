import { Role } from "./role.model";

export class User {
    id: string;
    username:string;
    email: string;
    password: string;
    role:Role;
  }