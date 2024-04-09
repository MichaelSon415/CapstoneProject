import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { UserService } from 'src/user/user.service';
import { WorkoutService } from 'src/workout/workout.service';
import { workoutModel } from 'src/workout/workoutModel';
import { StorageService } from '../storage.service';
import { jwtDecode } from 'jwt-decode';
// import { ProfilePictureService } from 'src/profilePicture.service';
import { GetToken } from 'src/utilFunctionTokenService.service';

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class SocialPageComponent implements OnInit {
  groups: string[] = ["Group 1", "Group 2"];
  goals: string[] = [];
  username: string[] = [];

  savedGoal: string = '';
  savedUsername: string = '';

  usersArray: any[] = [];

  userName: string;

  selectedFile: File | null = null;
  userId: string = '';

  user: any;

  fullToken: string = '';
  profilePicture: string = '';
  

 

  constructor(private userService: UserService,
     private storageService: StorageService,
     private getToken: GetToken, ) {
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
    this.userId = this.getToken.getUserIdFromToken(token) || '0';
    this.fullToken = this.getToken.getDecodedToken(token)||'0';
    console.log(this.fullToken)
    // this.profilePicture = this.getToken.getProfilePictureUrl(token) || '0';
    // console.log(this.profilePicture);

    // const relativeUrl = this.profilePicture;
    // console.log("Here is relativeUrl from social-page ts", relativeUrl);
    // this.profilePicture = `https://app.fitn3ss777.com/${relativeUrl.replace(/\\/g, '/')}`;
    // this.profilePicture = 'C:/Users/Administrator/Documents/GitHub/CECS491AProject/backend/uploads/1702891037031.png'
    // this.profilePicture = `http://localhost:9992/${relativeUrl.replace(/\\/g, '/')}`;
    // this.profilePicture = this.getProfilePictureUrl(relativeUrl);
    // console.log(this.profilePicture);

    console.log("Here is get user")
    this.getUser(this.userName);
    // console.log("Here is user", this.getUser(this.userName))


  

    
    this.goals.push(this.savedGoal);
    this.username.push(this.savedUsername);
    // console.log(this.username);
    // console.log(this.goals);
    this.getAllUser();
    // console.log("Here is getAlluser result", this.usersArray);


    
  }

  getProfilePicture(username: string){

  }

  getAllUser() {
    this.userService.getAllUser().subscribe((resultData: any) => {
      this.usersArray = resultData.data;
      this.usersArray.forEach(user => {
        user.profilePictureUrl = this.getProfilePictureUrl(user.profilePicture);
      });
  
      console.log("Here is getAlluser result", this.usersArray);
    });
  }

  getProfilePictureUrl(relativePath: string | null | undefined): string {
    if (!relativePath) {
      return 'https://app.fitn3ss777.com/uploads/temp_user_image.png';
    }
    return `https://app.fitn3ss777.com/${relativePath.replace(/\\/g, '/')}`;
  }
  uploadedImageUrl: string | null = null;
  onUpload() {
    if (this.selectedFile) {
      this.userService.uploadProfilePicture(this.userId, this.selectedFile)
        .subscribe(response => {
          console.log('Profile picture uploaded:', response);
          this.uploadedImageUrl = response.filePath;
        }, error => {
          console.error('Error uploading file:', error);
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  getUser(username: string): void {
    this.userService.getOneUser(username).subscribe(
      data => {
        this.user = data;
        console.log('User data:', this.user);
        if (this.user && this.user.data && this.user.data.profilePicture) {
          this.profilePicture = this.getProfilePictureUrl(this.user.data.profilePicture);
        } else {
          this.profilePicture = this.getProfilePictureUrl(null);
        }
      },
      error => {
        console.error('Error fetching user data:', error);
        this.profilePicture = this.getProfilePictureUrl(null);
      }
    );
  }

  
  
  

  
}
