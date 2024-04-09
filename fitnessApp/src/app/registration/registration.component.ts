import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { __values } from 'tslib';
import { ChatService } from 'src/services/chat.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { UserService } from 'src/user/user.service';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../assets/Stylesheet/login.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  dateOfBirth: string = "";
  trainerCheck: string = "";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  userId: string; //K
  regArray: any[] = [];
  /* constructor(private http: HttpClient, private formBuilder: FormBuilder, private chatService: ChatService, private userService: UserService, public router: Router) { }; */

  constructor(private formBuilder: FormBuilder, /*private chatService: ChatService,*/ private userService: UserService, public router: Router) { };
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator()]],
      trainerCheck: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // Set the date picker start date at 18 years ago
  @ViewChild('picker') picker!: MatDatepicker<Date>;

  ngAfterViewInit(): void {
    // Set the date picker start date at 18 years ago
    // Calculate the date 18 years ago
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
    // Set the startAt property of the datepicker
    this.picker.startAt = minDate;


  }

  // Validate if the user is at least 18 years old
  dateOfBirthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // No validation error if the control is empty
      }

      // Convert the selected date to a JavaScript Date object
      const selectedDate = new Date(control.value);

      // Calculate the minimum allowed date (18 years ago from today)
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);

      // Check if the selected date is at least 18 years ago
      return selectedDate.getTime() <= minDate.getTime()
        ? null // No validation error
        : { underage: true }; // Validation error if the user is underage
    };
  }

  // formattedDate: string = ''; // Initialize to an empty string

  // onDateChange(event: any) {
  //   // Assuming event is a Date object or date string (e.g., "yyyy-MM-dd")
  //   if (event instanceof Date) {
  //     this.formattedDate = this.formatDate(event);
  //   } else {
  //     this.formattedDate = event;
  //   }
  // }

  // formatDate(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are zero-based
  //   const day = date.getDate().toString().padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }

   register() {
    let bodyData =
    {
      "firstName": this.registrationForm.controls['firstName']!.value,
      "lastName": this.registrationForm.controls['lastName']!.value,
      "email": this.registrationForm.controls['email']!.value,
      "dateOfBirth": this.registrationForm.controls['dateOfBirth']!.value,
      "trainerCheck": this.registrationForm.controls['trainerCheck']!.value,
      "username": this.registrationForm.controls['username']!.value,
      "password": this.registrationForm.controls['password']!.value,
      "confirmPassword": this.registrationForm.controls['confirmPassword']!.value,
      
    };
    console.log(bodyData.username)
    //this.createUser(bodyData.username)
    //Create Function

    this.userService.createUser(bodyData.firstName, bodyData.lastName, bodyData.email, bodyData.dateOfBirth, bodyData.trainerCheck, bodyData.username, bodyData.password, bodyData.confirmPassword, '').subscribe
      ({
        next: resultData => {
          console.log(resultData);

          if (resultData) {
            alert("User Registered Successfully");
            //this.createUser(bodyData.username)
            this.navigate()
          } else {
            alert("Registration failed.");
        }
      },
      
    }); 

    

    // this.http.post("http://localhost:9992/user/create", bodyData).subscribe((resultData: any) =>
    // {
    //   console.log(resultData);
    //   alert("User Registered Successfully")
    // });

    //Read Function

    this.userService.getUser().subscribe
      ({
        next: resultData => {
          console.log(resultData);
        }
      });

    // this.http.get("http://localhost:9992/user/read").subscribe((resultData: any) =>
    // {
    //   this.regArray = resultData.data;
    //   for(let data of this.regArray)
    //   {
    //     console.log(data);
    //   }
    // });
  } 

  navigate() {
    this.router.navigateByUrl('/input');

  }
/* click(){
  this.createUser(this.username);
} */



// createUser(usern: string) {
//   this.chatService.createUser(usern, usern, '').subscribe(
//     response => {
//       console.log('User created successfully:', response);
//       // Handle the response or perform any additional actions
//     },
//     error => {
//       console.error('Error creating user:', error);
//     }
//   );
// }

}
  


