import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';

import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiBaseUrl = 'http://localhost:3030';

  constructor(private httpClient: HttpClient) { }
  authSubject = new  BehaviorSubject(false);
  signIn(user: User): Observable<JwtResponse> {
    return this.httpClient.post(`${this.apiBaseUrl}/login`, user).pipe(
      tap(async (res: JwtResponse) => {

        if (res.user) {
          localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
          //localStorage.set("EXPIRES_IN", res.user.expires_in);
         // localStorage.set("id",res.user.id);
          this.authSubject.next(true);
        }
      }) 
    );

  }
  
  signOut() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    //localStorage.removeItem("id");
    this.authSubject.next(false);
  }
  isAuthenticated() {
    return  this.authSubject.asObservable();
    
}
  signup(form)
  {
    return this.httpClient.post(`${this.apiBaseUrl}/signup`,form).pipe(
      catchError(this.handleError )
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
