import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user/user.service';

import { GetToken } from 'src/utilFunctionTokenService.service';
import { StorageService } from '../storage.service';
import { userModel } from 'src/user/userModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, } from '@angular/forms';
import { NavigationService } from 'src/services/navigation.service';
import { LoadingServiced } from 'src/loadingService.service';
import { delay } from 'rxjs';
import { Token } from '@angular/compiler';
import { WorkoutService } from 'src/workout/workout.service';
import { workoutModel } from 'src/workout/workoutModel';
import { jwtDecode } from 'jwt-decode';






@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService,
    private storageService: StorageService,
    private getToken: GetToken, public formBuilder: FormBuilder,
    private navigationService: NavigationService, public loadingService: LoadingServiced) {
  }

  userName: string;
  userId: string;
  accountForm!: FormGroup;
  profilePicture: string = '';
  user: any;
  selectedFile: File | null = null;





  ngOnInit(): void {

    const token = this.storageService.getTokenValue();
    this.userName = this.getToken.getUserNameFromToken(token) || '0';

    this.userId = this.getToken.getUserIdFromToken(token) || '0';

    this.getUser(this.userName);




    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });



  }

  goToAnotherPage(innerItem: string) {
    this.navigationService.selectInnerItem(innerItem);
  }


  // updateUserDetails(userId: string) {
  //   this.userService.getUserById(userId).subscribe(currentUser => {
  //     const updatedUserData: userModel = {
  //       ...currentUser,
  //       firstName: this.accountForm.value.firstName,
  //       lastName: this.accountForm.value.lastName,
  //       trainerCheck: this.accountForm.value.trainerCheck
  //     };

  //     this.userService.updateUser(userId, updatedUserData).subscribe({
  //       next: (response: any) => {
  //         console.log('User updated successfully', response);
  //       },
  //       error: (error: any) => {
  //         console.error('Error updating user', error);
  //       }
  //     });
  //   });
  // }

  onSubmit() {
    if (this.accountForm.valid) {
      // this.loadingService.setLoading(true);


      const updatedUserData: Partial<userModel> = {
        ...this.user.data,
        firstName: this.accountForm.value.firstName,
        lastName: this.accountForm.value.lastName,

      };

      this.userService.updateUserPart(this.userId, updatedUserData).subscribe({
        next: (response) => {
          console.log('User updated successfully', response);
          // this.loadingService.setLoading(false);
          alert('User details updated successfully!');
          this.accountForm.reset();
          this.ngOnInit();
        },
        error: (error) => {
          // this.loadingService.setLoading(false);
          // alert('Error updating user details.');
        }
      });
    }
  }




  // updateUserDetails(userId: string) {
  //   const updatedUserData: userModel = {
  //     firstName: 'fn',   
  //     lastName: 'ln',     
  //     email: 'fn@ln.com', 
  //     dateOfBirth: '2001-01-01',   
  //     trainerCheck: 'no',         
  //     username: 'user353',     
  //     password: 'password',     
  //     confirmPassword: 'password' 
  //   };



  // this.userService.updateUser(userId, updatedUserData).subscribe({
  //   next: (response: any) => {

  //   },
  //   error: (error: any) => {

  //   }
  // });

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
          this.ngOnInit()
          alert('Image Uploaded')
          this.uploadedImageUrl = response.filePath;
        }, error => {
          console.error('Error uploading file:', error);
        });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.onUpload();
    }
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


