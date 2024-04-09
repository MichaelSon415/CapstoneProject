import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css',
    '../../assets/Stylesheet/login.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  currentPassword: string="";
  newPassword: string = "";
  confirmPassword: string = "";
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    let bodyData = {
      currentPassword: this.changePasswordForm.controls['currentPassword']!.value,
      newPassword: this.changePasswordForm.controls['newPassword']!.value,
      confirmPassword: this.changePasswordForm.controls['confirmPassword']!.value,
    }

    // console.log(bodyData);

    this.changePasswordForm.reset();
  }
}
