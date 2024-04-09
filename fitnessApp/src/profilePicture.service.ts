// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { jwtDecode } from 'jwt-decode';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProfilePictureService {
  
//   private domain: string = environment.domain;

//   constructor(private http: HttpClient) {}

//   //upload profill pic
//   uploadProfilePicture(userId: string, file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('profilePicture', file);
//     formData.append('userId', userId);

//     return this.http.post<any>(`${this.domain}user/uploadProfilePicture`, formData, {
//       headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
//     });
//   }

//   // get the user's profile image url
//   getProfilePictureUrl(token: string): string | null {
//     try {
//       const decodedToken: any = jwtDecode(token);
//       return `https://app.fitn3ss777.com/${decodedToken.profilePictureUrl.replace(/\\/g, '/')}`;
//     } catch (error) {
//       console.error("Error decoding token");
//       return null;
//     }
//   }
// }
