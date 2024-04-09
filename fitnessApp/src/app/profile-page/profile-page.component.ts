import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { UserService } from 'src/user/user.service';
import { WorkoutService } from 'src/workout/workout.service';
import { workoutModel } from 'src/workout/workoutModel';
import { StorageService } from '../storage.service';
import { jwtDecode } from 'jwt-decode';

import { GetToken } from 'src/utilFunctionTokenService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class ProfilePageComponent implements OnInit {
  groups: string[] = ["Group 1", "Group 2"];
  goals: string[] = [];
  username: string[] = [];

  savedGoal: string = '';
  savedUsername: string = '';

  usersArray: any[] = [];

  userName: string;

 

  constructor(private userService: UserService,
     private storageService: StorageService,
     private getToken: GetToken) {
  }


  ngOnInit(): void {
    // console.log("HEHELH:EFF");
    this.savedGoal = localStorage.getItem('savedGoal') || '';
    // const savedUsername = localStorage.getItem('savedUsername');
  
    // this.username.push(savedUsername);

    // this.userId = this.getUserIdFromToken(token);
    // const token = this.storageService.getTokenValue();
    // // console.log("TOKEN", token);
    // const decodedToken: any = jwtDecode(token);
    // // console.log("hello");
    // if (decodedToken !== null && decodedToken.username !==null) {
    // //  console.log("here is decoded token", decodedToken);


    //   this.userName = decodedToken.username;
    // } else {
    //   this.userName = '0'; //set default userId to ...
    // }

    const token = this.storageService.getTokenValue();
    this.userName = this.getToken.getUserNameFromToken(token) || '0';

  

    
    this.goals.push(this.savedGoal);
    this.username.push(this.savedUsername);
    // console.log(this.username);
    // console.log(this.goals);
    this.getAllUser();
   

    
  }

  getAllUser() {
    this.userService.getAllUser().subscribe((resultData: any) => {
      // console.log(resultData);

      this.usersArray = resultData.data;
    });
  }
}
