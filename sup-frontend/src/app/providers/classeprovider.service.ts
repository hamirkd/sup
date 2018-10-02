
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Classe } from '../models/classe.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})

export class ClasseproviderService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

   getAllClasses(): Promise<Classe[]>{
   return this.http.get(this.baseUrl+'/api/classes/')
    .toPromise()
    .then(response=>response.json() as Classe[])
    .catch(this.handleError);
  }

  
  getAllClassesSort(column:string,order:boolean): Promise<Classe[]>{
    return this.http.get(this.baseUrl+'/api/classes/sort/'+column+'/'+order)
    .toPromise()
    .then(response=>response.json() as Classe[])
    .catch(this.handleError);
  }

  createClasse(classeData:Classe):Promise<Classe>{
    return this.http.post(this.baseUrl+'/api/classes',classeData)
    .toPromise()
    .then(response => response.json() as Classe)
    .catch(this.handleError);
  }

  updateClasse(classeData: Classe): Promise<Classe>{
    return this.http.put(this.baseUrl+'/api/classes/'+classeData.id,classeData)
    .toPromise()
    .then(response=>response.json() as Classe)
    .catch(this.handleError);
  }

  deleteClasse(id: string):Promise<any>{
    return this.http.delete(this.baseUrl+'/api/classes/'+id)
    .toPromise()
    .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}