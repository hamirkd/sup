
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { SessionproviderService } from './sessionprovider.service';
import { User } from '../models/user.model';
import { DataU } from '../models/datau.model';
@Injectable({
  providedIn: 'root'
})

export class UserproviderService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http,private sessionprovider:SessionproviderService) { }

  getAllUsers(): Promise<User[]>{
    return this.http.get(this.baseUrl+'/api/users/')
    .toPromise()
    .then(response=>response.json() as User[])
    .catch(this.handleError);
  }

  createUser(userData:DataU):Promise<User>{
    return this.http.post(this.baseUrl+'/api/users',userData)
    .toPromise()
    .then(response => response.json() as User)
    .catch(this.handleError);
  }
  updateUser(userData:User):Promise<User>{
    console.log(userData);
    return this.http.put(this.baseUrl+'/api/users/'+userData.id,userData)
    .toPromise()
    .then(response => response.json() as User)
    .catch(this.handleError);
  }

  loginUser(userData:DataU):Promise<User>{
    console.log(userData);
    return this.http.post(this.baseUrl+'/api/users/login',userData)
    .toPromise()
    .then(response => response.json() as User)
    .catch(this.handleError);
  }

  async updateUserInfo(user:DataU){
    await this.loginUser(user).then((user)=>{
      console.clear();
     localStorage.setItem('user',JSON.stringify(user));
    }).catch(()=>{
      
    });
  }
  
  deleteUser(id: string):Promise<any>{
    return this.http.delete(this.baseUrl+'/api/users/'+id)
    .toPromise()
    .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}