import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient) { }
  private url="https://localhost:7143/api"



  registerUser(data: any): Observable<any> { 
    return this.http.post(`${this.url}/User/CreateUser`, data);
  }
  registerCompany(data: any): Observable<any> { 
    return this.http.post(`${this.url}/User/CreateCompany`, data);
  }
  getUsers(id: string|null): Observable<any> { 
    return this.http.get(`${this.url}/User/GetUsers/${id}`);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/User/LoginUser`, data);
  }






}
