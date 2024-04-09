import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment.development';
import { Token } from '../app/user-login/token';


const httpOptions = {
  headers: new HttpHeaders({'Content Type': 'application/json'})
};



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Environment variables
  private domain: string | undefined;
  private endpoint: string;


  constructor(private http: HttpClient) 
  { 
    this.domain = environment.domain;
    this.endpoint = 'user';
  }
  // interface/model name needs to be the same com
  //make sure the any changes to the interface/model type that is being exported 
  login(username: string, password: string): Observable<Token>{
    return this.http.post<Token>(
      /*"http://localhost:9992/user/login"*/
      this.domain + this.endpoint + '/login',
      {
        username,
        password,
      },
      //httpOptions
    );
  }
  /*
  logout(): Observable<any> {
    return this.http.post( , { }, httpOptions);
  }
  */
}
