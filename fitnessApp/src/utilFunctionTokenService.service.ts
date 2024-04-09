import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root'
  })
  
export class GetToken {


  getUserIdFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token);
      // console.log("Here is decoded token - id: ", decodedToken.id);

      return decodedToken.id;
    } catch (error) {
        console.log("Error getting yo tokens");
      return null;
    }
  }

  getUserNameFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token);
      // console.log("Here is decoded token - username: ", decodedToken.username);
      return decodedToken.username;


    } catch (error) {
        console.log("Error getting yo tokens");

      return null;
    }
  }

  getDecodedToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token);
      // console.log("Here is decoded token, ", decodedToken);
      return decodedToken;
    } catch (error) {
        console.log("Error getting yo tokens");

      return null;
    }
  }

  getProfilePictureUrl(token: string): string | null {
    try{
      const decodedToken: any = jwtDecode(token);
      return decodedToken.profilePictureUrl;
    }
    catch (error) {
      console.log("Error getting yo tokens");

    return null;
  }
  }
}
