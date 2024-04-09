import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-username-recovery',
  templateUrl: './username-recovery.component.html',
  styleUrls: ['./username-recovery.component.css', '../../assets/Stylesheet/login.css']
})
export class UsernameRecoveryComponent implements OnInit {
  usernameRecoveryForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usernameRecoveryForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  public sendEmail(form: HTMLFormElement) {
      emailjs.sendForm('service_ikgrvbs', 'template_rqd3zyi', form, 'cVa_1YWa-_E7rEyl-')
        .then((result: EmailJSResponseStatus) => {
          alert("Your email has been sent successfully.");
      this.usernameRecoveryForm.reset();

        }, (error) => {
          console.log("There was an error");
        });
    
  }
}
