import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from "./login.service";
import { StorageService } from './storage.service';
@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //req = req.clone({
      //withCredentials: true,
    //});
    
    //return next.handle(req);
    /*const authToken = this.loginService.getToken();
    const authRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
    */
   
    const idToken = this.storageService.getTokenValue();
    if(idToken) {
      const clone = req.clone({
        headers: req.headers.set("Authorization",
                                 "Bearer " + idToken)
     });
      //clone.headers.set("Authorization", "Bearer " + idToken);
      //console.log(clone);

      return next.handle(clone)
    }
    else {
      return next.handle(req);
    }
    
   //return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},
]
