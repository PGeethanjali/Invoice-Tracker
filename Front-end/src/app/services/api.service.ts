import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../models/api.response";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3030/';


  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"login", loginPayload);
  }

  signup(form): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"signup", form);
  }

  getlist(id: String) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"get_list/"+id);
  }
  getusername(id:string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"get_username/"+id);
  }
  getlistbydate(form): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"get_list_byuser",form);
  }

  checkuser(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"checkuser",loginPayload);
  }

  getuserbar(id: String) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"userbardata/"+id);
  }
  
  getadminlist() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"admin_list");
  }

  getadminlistbydate(form) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"get_list_byadmin",form);
  }
  
  getadminbar1() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"Adminbardata1");
  }
  getadminbar2() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"Adminbardata2");
  }
  getuserinvoice(id:String) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"get_user_invoice/"+id);
  }

  addinvoice(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"add_list", user);
  }

  updateinvoice(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl +"update_list", user);
  }

  deleteinvoice(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl+"delete_list/"+id);
  }
}
