import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MentalWellnessTrackerComponent } from '../mental-wellness-tracker/mental-wellness-tracker.component';
import { WorkoutService } from 'src/workout/workout.service';
import { CalorieService } from 'src/calorie/calorie.service';
import { StorageService } from '../storage.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { NavigationService } from 'src/services/navigation.service';


import Chart from 'chart.js/auto';

export interface inputInfo {
  username: string

}


@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {
  workoutAmount: number = 0;
  mentalAmount: number = 0;
  trophyAmount: number = 0;

  showMentalHealth: boolean = true;


  constructor(private dialogRef: MatDialog, private workoutService: WorkoutService, private calorieService: CalorieService, private storageService: StorageService, private getToken: GetToken, private navigationService: NavigationService) { }

  goToAnotherPage(innerItem: string) {
    this.navigationService.selectInnerItem(innerItem);
  }

  openDialog() {
    this.dialogRef.open(MentalWellnessTrackerComponent);
  }

  selectedDate: Date;
  userID: string;
  userToken: string;
  userName: string;
  workoutData: any[] = [];
  pastTenDaysWorkoutData: any[];
  calorieData: any[] = [];
  foodNameAndCalorieData: any[];
  dateFilteredCalorieData: any[];
  public workout_chart: any;
  public calorie_chart: any;

  showGraphToggle: boolean = false;


  ngOnInit(): void {
    this.getUserIDFromToken();
    const got_user_name = this.getToken.getUserNameFromToken(this.userToken);
    if (got_user_name) {
      this.userName = got_user_name;
    }

    this.selectedDate = new Date();
    this.selectedDate.setHours(0, 0, 0, 0);

    const savedWorkoutAmount = localStorage.getItem('workoutAmount');
    if (savedWorkoutAmount !== null) {
      this.workoutAmount = +savedWorkoutAmount;
    }
    else {
      this.workoutAmount = 3;
    }
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
    this.trophyAmount = this.mentalAmount + this.workoutAmount;

    this.showMentalHealth = localStorage.getItem('savedkCalToggle') === 'true';

    //kCalToggle will be set depending on the following comparisons, 
    //If the item obtained from storage is null then default to false (or true in the case of the other toggles)
    //If the item obtained from storage is not null then check if that item is equal to 'true', if it is then 
    //set the kCalToggle to true other wise set to false. 
    //same logic stands for the other toggles.

    this.showGraphToggle = localStorage.getItem('savedshowGraphToggle') !== null ?
      (localStorage.getItem('savedshowGraphToggle') === 'true') :
      true;

    // Create the chart if showGraphToggle is true or null
    if (this.showGraphToggle || this.showGraphToggle === null) {
      // If show chart, retrieve chart data from Mongo
      this.getWorkoutDataFromMongo();
      this.getCalorieDataFromMongo();
    }

  }

  ngAfterViewInit(): void {

  }

  getUserIDFromToken() {
    this.userToken = this.storageService.getTokenValue();
    this.userID = this.getToken.getUserIdFromToken(this.userToken) || '0';
  }

  getWorkoutDataFromMongo() {
    this.workoutService.getWorkoutByUserId(this.userID).subscribe(
      (data: any) => {
        this.workoutData = this.workoutService.extractAllWorkoutData(data);
        this.pastTenDaysWorkoutData = this.workoutService.getWorkoutDataForLast10Days(this.workoutData);
        if (this.showGraphToggle || this.showGraphToggle === null) {
          this.createWorkoutChart();
        }
      },
      (error: any) => {
        console.error('Error', error);
      }
    );
  }

  getCalorieDataFromMongo() {
    this.calorieService.getCalorieByUserId(this.userID).subscribe(
      (data: any) => {
        this.calorieData = this.calorieService.extractAllCalorieData(data);
        this.dateFilteredCalorieData = this.calorieService.filterItemsByDate(this.calorieData, this.selectedDate);
        this.foodNameAndCalorieData = this.calorieService.extractFoodAndCalorieData(this.dateFilteredCalorieData);
        if (this.showGraphToggle || this.showGraphToggle === null) {
          this.createCalorieChart();
        }
      },
      (error: any) => {
        console.error('Error', error);
      }
    );
  }

  chartColor = [
    '#00402a',
    '#005638',
    '#006c46',
    '#008040',
    '#00994d',
    '#00b359',
    '#00cc66',
    '#00e673',
    '#00ff80',
    '#1aff8c',
    '#33ff99',
    '#4dffad',
    '#66ffbf',
    '#80ffcc'
  ];

  workoutChartDotColor = '#8bb49e';
  workoutChartLineColor = '#006c46';

  createWorkoutChart() {
    // Workout data
    const dateList: string[] = this.pastTenDaysWorkoutData.map((item: any) => item.date);
    const totalSets: number[] = this.pastTenDaysWorkoutData.map((item: any) => item.totalSets);
    // Workout Progress Line Chart
    this.workout_chart = new Chart("workoutChart", {
      type: 'line',
      data: {
        labels: dateList,
        datasets: [{
          fill: true,
          data: totalSets,
          label: 'Total exercise sets',
          backgroundColor: this.workoutChartDotColor,
          borderColor: this.workoutChartLineColor,
          pointHitRadius: 50,
          pointHoverRadius: 10,
        }]
      },
      options: {
        aspectRatio: 1.5,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // title: {
          //   display: true,
          //   text: 'Workout Progress',
          //   font: {
          //     size: 24,
          //     family: 'Arial',
          //   }
          // }
          legend: {
            display: false,
            onClick: () => { },
          }
        },
        layout: {
          padding: 36,
        },
        // Removing grid lines
        scales: {
          x: {
            display: false,
            // grid: { display: false }
          },
          y: {
            display: false,
            // grid: { display: false }
          }
        }
      }
    });
  }

  createCalorieChart() {
    // Calorie data source
    let foodNames: string[] = [];
    let calories: number[] = [];
    if (this.foodNameAndCalorieData && this.foodNameAndCalorieData.length !== 0) {
      foodNames = this.foodNameAndCalorieData.map((item: any) => item.foodName);
      calories = this.foodNameAndCalorieData.map((item: any) => item.calories);
    } else {
      foodNames.push('No calorie data');
      calories.push(1);
    }
    // Calorie Pie Chart
    this.calorie_chart = new Chart("CalorieChart", {
      type: 'pie',
      data: {
        // Values on X-Axis
        // Legends, an array of strings
        labels: foodNames,
        // Dataset values
        datasets: [{
          // Data value corresponding to the legends, an array of values
          data: calories,
          // Value color corresponding to the legneds, an array of strings
          // the strings could be color or rgb value like 'rgb(255, 99, 132)',
          // or hex color
          label: 'Calorie',
          backgroundColor: this.chartColor,
          hoverOffset: 24
        }],
      },
      options: {
        aspectRatio: 1.5,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // title: {
          //   display: true,
          //   text: 'Calorie Tracker',
          //   font: {
          //     size: 24,
          //     family: 'Arial'
          //   }
          // }
          legend: {
            // Legend styling
            display: false,
            position: 'bottom',
            onClick: () => { },
            labels: {
              padding: 36
            }
          }
        },
        // Pie chart styling, removing borders
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        // Pie chart styling, adding padding
        layout: {
          padding: 24
        },
      },
    });
  }
}
