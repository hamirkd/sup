import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleproviderService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

   getAllRoles(): Promise<Role[]>{
   return this.http.get(this.baseUrl+'/api/roles/')
    .toPromise()
    .then(response=>response.json() as Role[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}