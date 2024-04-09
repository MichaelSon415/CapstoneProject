import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class ContactUsComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  public sendEmail(form: HTMLFormElement) {
      emailjs.sendForm('service_ikgrvbs', 'template_dq0rwhg', form, 'cVa_1YWa-_E7rEyl-')
        .then((result: EmailJSResponseStatus) => {
          // console.log("Email sent");

          alert("Your email has been sent successfully.");
      this.contactForm.reset();

        }, (error) => {
          console.log("There was an error");
        });
    
  }
  
  
}
