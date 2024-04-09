import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/workout/workout.service';
import { workoutModel } from 'src/workout/workoutModel';
import { StorageService } from '../storage.service';
import { jwtDecode } from 'jwt-decode';
import { GetToken } from 'src/utilFunctionTokenService.service';


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class AchievementsComponent implements OnInit {
  workoutAmount: number = 0;
  mentalAmount: number = 0;
  trophyAmount: number = 0;


  showMentalHealth: boolean = true;
  showWorkoutEntries: boolean = true;

  userWorkouts: workoutModel;
  userId: string; //change this from hard-coded value

  constructor(private workoutService: WorkoutService,
    private storageService: StorageService,
    private getToken: GetToken) { }


  ngOnInit(): void {
    //Get the savedWorkoutAmount (the total amount of time the user entered a workout entry)
    // const savedWorkoutAmount = localStorage.getItem('workoutAmount');
    // if (savedWorkoutAmount !== null) {
    //   this.workoutAmount = +savedWorkoutAmount; 
    // }
    // else{
    //   this.workoutAmount = 3;
    // }
    // console.log(this.workoutAmount);
    //get the savedMentalAmount (how many times the user entered a mental journal in mental wellness tracker)
    const savedMentalAmount = localStorage.getItem('mentalAmount');
    if (savedMentalAmount !== null) {
      this.mentalAmount = +savedMentalAmount;
    }
    else {
      this.mentalAmount = 2;
    }

    //Get total trophy amount
    // this.trophyAmount = this.mentalAmount + this.workoutAmount;

    // this.showMentalHealth = localStorage.getItem('savedshowStepsToggle') === 'true';
    // this.showWorkoutEntries = localStorage.getItem('savedkCalToggle') === 'true';

    this.showMentalHealth = localStorage.getItem('savedkCalToggle') === 'true';
    this.showWorkoutEntries = localStorage.getItem('savedshowStepsToggle') === 'true';

    

    // this.userId = this.getUserIdFromToken(token);
    // const token = this.storageService.getTokenValue();

    // const decodedToken: any = jwtDecode(token);
    // if (decodedToken !== null && decodedToken.id !==null) {
    //  console.log(decodedToken);


    //   this.userId = decodedToken.username;
    // } else {
    //   this.userId = '0'; //set default userId to ...
    // }
    //ignore the above comments. I created a service to this in 2 lines below

    const token = this.storageService.getTokenValue();
    this.userId = this.getToken.getUserIdFromToken(token) || '0';
    // console.log(this.userId);
    // const decodedToken = this.getToken.getDecodedToken(token) || '0';
    // console.log (decodedToken);





    // console.log(this.userId);


    // this.getWorkoutAmount();

    //Get the array length that is passed from mongo db using the 
    //'getWorkoutUser' function in the workoutService.js file
    //Need to find a way to use jwt tokens to receive user id so userId is not hard coded.

    this.workoutService.getWorkoutByUserId(this.userId).subscribe(
      (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.workoutAmount = response.data.length;
          this.trophyAmount = this.mentalAmount + this.workoutAmount;

          this.trophyAmount = 0;
          if (this.showMentalHealth) {
            this.trophyAmount += this.mentalAmount;
          }
          if (this.showWorkoutEntries) {
            this.trophyAmount += this.workoutAmount;
          }

        } else {
          console.error('Somethings not working gg');
        }
      }
    );

  }

  // getUserIdFromToken(token: string): string | null {
  //   try {
  //     const decodedToken: any = jwtDecode(token);
  //     return decodedToken.id; // Ensure 'id' matches the field in your token
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // }


  //Calculate the progress percentage for both workoutAmount and mentalAmount to fill the progress bar
  calculateProgress(workoutAmount: number, goal: number): number {
    let percentage = (workoutAmount / goal) * 100;
    return Math.min(percentage, 100);
  }

  calculateMentalProgress(mentalAmount: number, goal: number): number {
    let percentage = (mentalAmount / goal) * 100;
    return Math.min(percentage, 100);
  }

  // fetchUserWorkouts(): void {
  //   this.workoutService.getWorkoutUser(this.userId).subscribe(
  //     (workouts) => {
  //       this.userWorkouts = workouts;
  //       console.log('Workouts fetched successfully:', this.userWorkouts);
  //     },
  //     (error) => {
  //       console.error('Error fetching workouts:', error);
  //     }
  //   );
  // }




  getWorkoutAmount(): void {

  }





}
