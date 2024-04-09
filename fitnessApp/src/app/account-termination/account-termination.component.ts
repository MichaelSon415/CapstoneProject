import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { __values } from 'tslib';
import { UserService } from 'src/user/user.service';
import { userCallback } from 'sendbird';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-account-termination',
  templateUrl: './account-termination.component.html',
  styleUrls: ['./account-termination.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class AccountTerminationComponent implements OnInit {
  terminateAccountForm!: FormGroup;
  terminatePassword: string = "";
  terminateReason: string = "";

  userId: string;


  constructor(private fb: FormBuilder, private http: HttpClient,
    private userService: UserService,
    private getToken: GetToken, private storageService: StorageService) { };



  ngOnInit() {
    this.terminateAccountForm = this.fb.group({
      terminatePassword: ['', Validators.required],

      terminateReason: ['', Validators.required],
    })

    const token = this.storageService.getTokenValue();
    this.userId = this.getToken.getUserIdFromToken(token) || '0';
  }


  onSubmit() {
    let bodyData = {
      "terminateReason": this.terminateAccountForm.controls['terminateReason']!.value,
      "terminatePassword": this.terminateAccountForm.controls['terminatePassword']!.value
    }




// if (bodyData.terminateReason && bodyData.terminatePassword) {
 
//   this.userService.deleteUser(this.userId).subscribe(() => {
    
//   }, error => {
    
//   });
// } else {
  
// }
    
   
    
        
    

    this.terminateAccountForm.reset();
  }



}
