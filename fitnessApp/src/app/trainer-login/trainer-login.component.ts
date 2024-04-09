import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trainer-login',
  templateUrl: './trainer-login.component.html',
  styleUrls: ['./trainer-login.component.css',
    '../../assets/Stylesheet/login.css']
})
export class TrainerLoginComponent implements OnInit {

  trainerLoginForm!: FormGroup;
  submitted = false;
  trainerUserNames: string[] = [];
  trainerPasswords: string[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.trainerLoginForm = this.formBuilder.group({
      trainerUserName: ['', Validators.required],
      trainerPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.trainerLoginForm.invalid) {
      return;
    }

    // get the form values
    const trainerUserName = this.trainerLoginForm.value.trainerUserName;
    const trainerPassword = this.trainerLoginForm.value.trainerPassword;

    // add the values to the arrays
    this.trainerUserNames.push(trainerUserName);
    this.trainerPasswords.push(trainerPassword);

    this.trainerLoginForm.reset();
  }

}