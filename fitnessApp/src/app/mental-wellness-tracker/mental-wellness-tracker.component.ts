import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-mental-wellness-tracker',
  templateUrl: './mental-wellness-tracker.component.html',
  styleUrls: ['./mental-wellness-tracker.component.css']
})


export class MentalWellnessTrackerComponent implements OnInit{
  mentalAmount: number=2;
  ngOnInit(): void {

    //get previously saved amount

    const savedMentalAmount = localStorage.getItem('mentalAmount');
    if (savedMentalAmount !== null) {
      this.mentalAmount = +savedMentalAmount; 
      if (this.mentalAmount >=16){
        this.mentalAmount = 2;
      }
    }
  }
  //emotion gets stored to this variable
  //The emotion will get stored as a string so that we don't have to worry
  //about future if-statement implementations if we want to repeat the emotion back to the user
  userEmotion: string = "";
  //generate a constructor so we can use the matdialogref and close the pop-up after the user enters an option
  constructor(private dialogRef: MatDialogRef<MentalWellnessTrackerComponent>){}
  //Create a function to store the emotion the user enters as a number and close the pop-up
  //also for some reason makes the mental-wellness-tracker-component not viewable except through the pop-up in
  //client-trainer-information page
  storeEmotion(emotion: string): void{
    this.userEmotion = emotion;
    // console.log(this.userEmotion);
    
    //save amount to storage

    this.mentalAmount++;
    localStorage.setItem('mentalAmount', this.mentalAmount.toString());

    this.dialogRef.close();
  }


 
}
