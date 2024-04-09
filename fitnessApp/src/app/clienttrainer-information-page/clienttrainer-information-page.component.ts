import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MentalWellnessTrackerComponent } from '../mental-wellness-tracker/mental-wellness-tracker.component';
import Chart from 'chart.js/auto';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { StorageService } from '../storage.service';




@Component({
  selector: 'app-clienttrainer-information-page',
  templateUrl: './clienttrainer-information-page.component.html',
  styleUrls: ['./clienttrainer-information-page.component.css']
})
//We'll use Matdialog (we'll call it dialogref) to manipulate a modal pop-up 
//in this case we're making a mental wellness component popup
export class ClienttrainerInformationPageComponent implements OnInit {
  constructor(private dialogRef : MatDialog,
    private getToken:GetToken, private storageService : StorageService){}

  public chart: any;

  showGraphToggle: boolean = false;

  userName: string;
  showMentalHealth: boolean = true;
  savedGoal:string = "";
  goals: string[] = [];



  ngOnInit(): void {

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
        this.createChart();
    }

    this.showMentalHealth = localStorage.getItem('savedkCalToggle') === 'true';


    const token = this.storageService.getTokenValue();
    this.userName = this.getToken.getUserNameFromToken(token) || '0';

    this.savedGoal = localStorage.getItem('savedGoal') || '';

    this.goals.push(this.savedGoal);


    
                        
  }


  ngAfterViewInit(): void {
    if (this.showGraphToggle || this.showGraphToggle === null) {
      this.createChart();
  }

  this.showMentalHealth = localStorage.getItem('savedkCalToggle') === 'true';


  const token = this.storageService.getTokenValue();
  this.userName = this.getToken.getUserNameFromToken(token) || '0';

  this.savedGoal = localStorage.getItem('savedGoal') || '';

  this.goals.push(this.savedGoal);
  }

  openDialog(){
    this.dialogRef.open(MentalWellnessTrackerComponent);
  }

  



  chartColor = [
    '#00402a',
    '#005638',
    '#006c46',
    '#32896a',
    '#66a690',
    '#99c4b5'
  ]

  tempCalorieLabel = ['Carbs', 'Fats', 'Protein', 'Other'];
  tempCalorieData = [67, 59, 103, 405];
  tempWorkoutDataYValue = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
  tempWorkoutDataXValue = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
  workoutChartDotColor = '#8bb49e';
  workoutChartLineColor = '#006c46';

  createChart() {
    // Calorie Pie Chart
    this.chart = new Chart("CalorieChart", {
      type: 'pie',
      data: {
        // Values on X-Axis
        // Legends, an array of strings
        labels: this.tempCalorieLabel,
        // Dataset values
        datasets: [{
          // Data value corresponding to the legends, an array of values
          data: this.tempCalorieData,
          // Value color corresponding to the legneds, an array of strings
          // the strings could be color or rgb value like 'rgb(255, 99, 132)',
          // or hex color
          backgroundColor: this.chartColor,
          hoverOffset: 24
        }],
      },
      options: {
        aspectRatio: 1,
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
            display: true,
            position: 'bottom',
            labels: {
              padding: 24
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

    // Workout Progress Line Chart
    this.chart = new Chart("workoutChart", {
      type: 'line',
      data: {
        labels: this.tempWorkoutDataXValue,
        datasets: [{
          fill: true,
          data: this.tempWorkoutDataYValue,
          label: 'Calorie Burned',
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
          title: {
            display: true,
            text: 'Workout Progress',
            font: {
              size: 24,
              family: 'Arial',
            }
          }
        },
        layout: {
          padding: 24,
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

}