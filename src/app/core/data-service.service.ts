import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, UserRegister } from '../shared/data-interface';
import { Company } from '../shared/data-interface';
import { User } from '../shared/data-interface';
import { Warehouse } from '../shared/data-interface';
import { LoginModel } from '../shared/data-interface';
import { Product } from '../shared/data-interface';
// import { GetEntryProduct } from '../shared/data-interface';
// import { ExitProduct } from '../shared/data-interface';
// import { GetExitProduct } from '../shared/data-interface';
// import { UpdateEntryProduct } from '../shared/data-interface';
// import { UpdateExitProduct } from '../shared/data-interface';
import { CurrentAllBalance } from '../shared/data-interface';
import { CurrentBalance } from '../shared/data-interface';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  private url = "https://localhost:7143/api"


  registerUser(data: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.url}/User/CreateUser`, data);
  }
  registerCompany(data: Company): Observable<Company> {
    return this.http.post<Company>(`${this.url}/User/CreateCompany`, data);
  }
  getUsers(id: number | null): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/User/GetUsers/${id}`);
  }
  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.url}/Product/GetWarehouses/`);
  }

  login(data: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/User/LoginUser`, data);
  }
  UpdateUser(data: User): Observable<User> {
    return this.http.put<User>(`${this.url}/User/UpdateUser/${data.id}`, data);
  }

  getAllEntryProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/Product/GetAllEntryProducts`);
  }
  getAllExitProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/Product/GetAllExitProducts`);
  }

  getAllCurrentBalance(): Observable<CurrentAllBalance[]> {
    return this.http.get<CurrentAllBalance[]>(`${this.url}/Product/GetAllCurrentBalance`);
  }

  getEntryProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/Product/GetEntryProduct/${id}`);
  }
  getExitProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/Product/GetExitProduct/${id}`);
  }

  getCurrentBalance(id: number): Observable<CurrentBalance[]> {
    return this.http.get<CurrentBalance[]>(`${this.url}/Product/GetCurrentBalance/${id}`);
  }
  getWarehouseForUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/Product/GetWarehouseForUser/${id}`);

  }

  addEntryProducts(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/Product/EntryProduct`, data);
  }
  addExitProducts(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/Product/ExitProduct`, data);
  }
  addWarehouse(data: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.url}/Product/AddWarehouse`, data);
  }
  UpdateEntryProduct(data: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.url}/Product/UpdateEntryProduct/${id}`, data);
  }
  UpdateExitProduct(data: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.url}/Product/UpdateExitProduct/${id}`, data);
  }
  UpdateWarehouse(data: Warehouse, id: number): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.url}/Product/UpdateWarehouse/${id}`, data);
  }


}
