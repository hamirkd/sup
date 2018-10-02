import { User } from "./user.model";
import { Classe } from "./classe.model";

export class Cour {
    id: string;
    titre: string;
    contenu: string;
    user:User;
    classes:Classe[];
    usersSuivi:User[];
    visibilite:boolean;
    createdAt: Date;
  }