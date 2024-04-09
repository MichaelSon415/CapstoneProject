import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.css',
'../../assets/Stylesheet/mainbox.css']
})
export class GroupCreationComponent {
  groupCreation!: FormGroup;
  submitted = false;
  groupName: string = '';
  goals: string = '';
  description: string = '';


  constructor(public formBuilder:FormBuilder, private http: HttpClient){}

  ngOnInit() {
    this.groupCreation = this.formBuilder.group({
      groupName: ['', Validators.required],
      goals:['', Validators.required],
      description:['', Validators.required],
    })
  }
    
  onSubmit() {

    let bodyData = {
      groupName: this.groupCreation.controls['groupName']!.value,	
      goals: this.groupCreation.controls['goals']!.value,
      description: this.groupCreation.controls['description']!.value,

    }

  }
}
