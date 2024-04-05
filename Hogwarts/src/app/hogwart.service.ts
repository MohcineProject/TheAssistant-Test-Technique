import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';
@Injectable({
  providedIn: 'root'
  
})

export class HogwartService {

  constructor(private httpclient:HttpClient) { }

  loadData(path:string) : Observable<Person[]> {
   return this.httpclient.get<Person[]>(path , {responseType : 'json'}) ; 

  }

}
