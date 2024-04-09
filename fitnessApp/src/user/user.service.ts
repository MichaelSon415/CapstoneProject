import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userModel } from './userModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint = 'user';

  private domain: string | undefined;
  
  constructor(private http: HttpClient) 
  { 
  this.domain = environment.domain;
  }

  //Used CRUD operations for registration 

  createUser(firstName: string, lastName: string, email : string, dateOfBirth: string, trainerCheck: string, username: string, password: string, confirmPassword: string, profilePicture:string): Observable<userModel>
  {
    var enteredUser = new userModel(firstName, lastName, email, dateOfBirth, trainerCheck, username, password, confirmPassword, '');
    return this.http.post<userModel>(this.domain + this.endpoint + '/create', enteredUser);
  }

  getUser(): Observable<userModel>
  {
    return this.http.get<userModel>(this.domain + this.endpoint + '/read');
  }

  getAllUser(): Observable<userModel>
  {
    return this.http.get<userModel>(this.domain + this.endpoint + '/readAll');
  }

  getOneUser(name: string): Observable<userModel>
  {
    return this.http.get<userModel>(this.domain + this.endpoint + '/readOne/' + name);
  }

  //updateUser 
  updateUser(userId: string, updatedUser: userModel): Observable<userModel> {
    return this.http.patch<userModel>(this.domain + this.endpoint + '/update/' + userId, updatedUser);
  }

  updateUserPart(userId: string, updatedUser: Partial<userModel>): Observable<userModel> {
    return  this.http.patch<userModel>(this.domain + this.endpoint + '/update/' + userId, updatedUser);
  }
  
  
  uploadProfilePicture(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('userId', userId);

    return this.http.post<any>(this.domain + this.endpoint + '/uploadProfilePicture', formData);
}

  

  

  //DeleteUser
  // deleteUser(userId: string): Observable<any> {
  // }

  //Login Service for user-login

  loginUser(username: string, password: string): Observable<userModel>
  {
    let enteredInfo = 
    {
      "enteredUser": username,
      "enteredPassword": password
    }
    return this.http.post<userModel>(this.domain + this.endpoint + '/login', enteredInfo);
  }

  // getUserById(userId: string): Observable<userModel> {
  //   return this.http.post<userModel>(this.domain + this.endpoint + '/read', userId);

  // }
  
  
  

  
}
