import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';
import { UserService } from 'src/user/user.service';
import { Token } from './token';
import { environment } from 'src/environments/environment.development';
import { ChatService } from 'src/services/chat.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import SendBird from 'sendbird';
import { LoadingServiced } from 'src/loadingService.service';
import { delay } from 'rxjs';



// export interface bodyData {
//   username: string
//   password:string
  
// }

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css',
    '../../assets/Stylesheet/login.css']
})
export class UserLoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  submitted = false;
  userUserNames: string = '';
  userPasswords: string = '';
  sbUserName: string;
  sbUserId: string;
  globalChannel: SendBird.GroupChannel;
  API_Token: string;
  connected = false;

  isLogin: boolean = false;

  

  errorMessage: string = "Wrong Credentials";

  constructor(private loginService: LoginService, private storageService: StorageService, 
    private router: Router, private http: HttpClient, private formBuilder: FormBuilder,
    private chatService: ChatService, private getToken: GetToken,
    public loadingService: LoadingServiced) { this.API_Token = environment.API_TOKEN; }

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLogin = true; 
    }
      this.userLoginForm = this.formBuilder.group({
      userUserName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  // ngAfterViewInit() {
  //   if (!this.connected) {
  //     //console.log(this.chatService.sb.getConnectionState(), 'connect please')
  //     this.chatService.init();
  //     this.connect();
  //     console.log(this.chatService.sb.getConnectionState(), 'connect please')
  //     this.connect();
  //     console.log(this.chatService.sb.getConnectionState(), 'connect please')
  //   }
  // } 

  onSubmit() {
    this.loadingService.setLoading(true);

    console.log(this.userLoginForm.controls['userUserName']!.value);
    console.log(this.userLoginForm.controls['userPassword']!.value);

    let bodyData= {
      username: this.userLoginForm.controls['userUserName']!.value,
      password: this.userLoginForm.controls['userPassword']!.value,
    };
    /*
    console.log(bodyData);

    this.http.post("http://localhost:9992/user/login", bodyData).subscribe((resultData: any) => {
       console.log(resultData);

      if (resultData.status) {
        this.router.navigateByUrl('/homepage');
      }

      else {
        alert("Incorrect Email or Password");
        console.log("Error Login");
      }
    }); 
    */

    this.loginService.login(bodyData.username, bodyData.password).pipe(
      delay(2000)  
    ).subscribe({
      next: data => {
        
        this.loadingService.setLoading(false);
        
        this.storageService.saveUser(data.idToken);
        this.isLogin = true;
        this.router.navigateByUrl('/navbar');

        this.chatService.init();
        this.connect();
        const token = this.storageService.getTokenValue();
        this.sbUserName = this.getToken.getUserNameFromToken(token) || '0';
        this.sbUserId = this.getToken.getUserIdFromToken(token) || '0';
        this.createUser();
      },
      error: err => {
        this.loadingService.setLoading(false);
        this.errorMessage = err.errorMessage;
        this.isLogin = false;
      }
    });

    // this.saveVariables(bodyData);
    /*
    this.submitted = true;

    // stop here if form is invalid
    if (this.userLoginForm.invalid) {
      return;
    }

    // get the form values
    const trainerUserName = this.userLoginForm.value.userUserName;
    const trainerPassword = this.userLoginForm.value.userPassword;

    // add the values to the arrays
    this.userUserNames.push(trainerUserName);
    this.userPasswords.push(trainerPassword);

    this.userLoginForm.reset();
    */
  }

  // saveVariables(data: bodyData) {
  //   localStorage.setItem('savedUsername', data.username);


    
  // }

  connect() {
    this.chatService.connect('263369', 'b0335c770e9a994c5033b7ec60918b1b29b67546', (error: any, user: any) => {
      if (!error) {
        this.connected = true;
      }
    });
    console.log(this.chatService.sb.getConnectionState())
  }

  createUser() {
    console.log(this.sbUserId, this.sbUserName)
    this.chatService.createUser(this.sbUserId, this.sbUserName, '').subscribe(
      response => {
        console.log('User created successfully:', response);
        // Handle the response or perform any additional action
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
    this.joinGlobalChat();
  }
  
  joinGlobalChat() {
    this.chatService.getGlobalChat().then((channel: SendBird.GroupChannel) => {
      this.globalChannel = channel;
      // Join the user to the channel
      this.globalChannel.join().then(() => {
        // User has successfully joined the channel
        this.chatService.inviteUser(this.globalChannel, [this.sbUserId])
          .then(response => {
            console.log('Users invited successfully:', response);
          })
          .catch(error => {
            console.error('Failed to invite users:', error);
          });
      }).catch((error: any) => {
        // Handle any errors that occur during the join process
        console.error('Failed to join global chat:', error);
      });
    }).catch((error: any) => {
      // Handle any errors that occur during the retrieval
      console.error('Failed to retrieve global chat:', error);
    });
}

}