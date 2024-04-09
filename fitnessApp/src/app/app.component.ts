import { Component } from '@angular/core';
import { MentalWellnessTrackerComponent } from './mental-wellness-tracker/mental-wellness-tracker.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fitnessApp';

  constructor(private dialogRef : MatDialog){}

  openDialog(){
    this.dialogRef.open(MentalWellnessTrackerComponent);
  }
  

}
