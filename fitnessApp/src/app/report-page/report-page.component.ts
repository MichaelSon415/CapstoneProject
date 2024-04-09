import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { __values } from 'tslib';



@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit{
  reportForm!:FormGroup;
  reportReason: string = "";
  // username: string = "";


  constructor(private fb: FormBuilder, private http: HttpClient) { };
ngOnInit(){
  this.reportForm = this.fb.group({
    // username: ['', Validators.required],

    reportReason: ['', Validators.required]
  })
}

  


  onSubmit(){
    let bodyData = {
      // "username": this.reportForm.controls['username']!.value,

      "reportReason": this.reportForm.controls['reportReason']!.value
    }

    this.reportForm.reset();
  }
}
