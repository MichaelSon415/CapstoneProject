import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css',
    '../../assets/Stylesheet/login.css']
})
export class PasswordRecoveryComponent implements OnInit {
  passwordRecoveryForm!: FormGroup;
  submitted = false;
  username: string = '';
  email: string = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordRecoveryForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    let bodyData = {
      username: this.passwordRecoveryForm.controls['username']!.value,
      email: this.passwordRecoveryForm.controls['email']!.value,
    }

    console.log(bodyData);

    this.passwordRecoveryForm.reset();
  }
}
