import { Component, HostListener, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { WorkoutService } from 'src/workout/workout.service';
import { StorageService } from '../storage.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationService } from 'src/services/navigation.service';
import { workoutModel } from 'src/workout/workoutModel';

interface MuscleGroup {
  value: string;
  label: string;
}

@Component({
  selector: 'app-workout-information',
  templateUrl: './workout-information.component.html',
  styleUrls: ['./workout-information.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class WorkoutInformationComponent implements OnInit {
  constructor(
    private workoutService: WorkoutService,
    private storageService: StorageService,
    private getToken: GetToken,
    private navigationService: NavigationService
  ) { };

  // Screen width
  screenWidth!: number;
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    this.updateTableCols();
  }

  // Navigation service
  goToAnotherPage(innerItem: string, param?: string) {
    this.navigationService.selectInnerItem(innerItem, param);
  }

  userID: string;
  userToken: string;
  workoutData: any[] = [];
  workoutDataTypesAndSets: any[];
  dateFilteredWorkoutData: any[];
  showWorkoutRecommendations: boolean = false;
  workoutAmount: number = 0;
  selectedDate: Date;
  selectedDateString: string;

  muscleGroups: MuscleGroup[] = [
    { value: 'abdominals', label: 'Abdominals' },
    { value: 'abductors', label: 'Abductors' },
    { value: 'adductors', label: 'Adductors' },
    { value: 'biceps', label: 'Biceps' },
    { value: 'calves', label: 'Calves' },
    { value: 'chest', label: 'Chest' },
    { value: 'forearms', label: 'Forearms' },
    { value: 'glutes', label: 'Glutes' },
    { value: 'hamstrings', label: 'Hamstrings' },
    { value: 'lats', label: 'Lats' },
    { value: 'lower_back', label: 'Lower Back' },
    { value: 'middle_back', label: 'Middle Back' },
    { value: 'neck', label: 'Neck' },
    { value: 'quadriceps', label: 'Quadriceps' },
    { value: 'traps', label: 'Traps' },
    { value: 'triceps', label: 'Triceps' }
  ];

  muscleGroup: string = "abdominals";
  recommendedExercises: any[] = [];

  ngOnInit(): void {
    // Screen width
    this.screenWidth = window.innerWidth;
    this.updateTableCols();
    // Recommendation toggle
    this.showWorkoutRecommendations = localStorage.getItem('savednutritionalRecommendationsToggle') === 'true';
    //get previously saved amount
    const savedWorkoutAmount = localStorage.getItem('workoutAmount');
    if (savedWorkoutAmount !== null) {
      this.workoutAmount = +savedWorkoutAmount;
    }
    // Chart toggle
    this.showGraphToggle = localStorage.getItem('savedshowGraphToggle') !== null ?
      (localStorage.getItem('savedshowGraphToggle') === 'true') : true;
    // Date picker
    this.selectedDate = new Date();
    this.selectedDate.setHours(0, 0, 0, 0);
    this.selectedDateString = this.selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // Workout recommendations
    const storedRecommendations = localStorage.getItem(`workoutRecommendations_${this.muscleGroup}`);
    if (storedRecommendations) {
      console.log("Found stored recommendations");
      this.recommendedExercises = JSON.parse(storedRecommendations);
    } else {
      console.log("Recommendations not found, fetching...");
      this.fetchRecommendations();
    }
    // Get Data from Mongo
    this.getUserIDFromToken();
    this.getWorkoutDataFromMongo();
  }

  onDateChange(event: any) {
    this.selectedDateString = this.selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // Call API to retrieve new data
    this.updateWorkoutDataVariables();
    this.refreshChart();
  }

  getUserIDFromToken() {
    this.userToken = this.storageService.getTokenValue();
    this.userID = this.getToken.getUserIdFromToken(this.userToken) || '0';
  }

  getWorkoutDataFromMongo() {
    this.workoutService.getWorkoutByUserId(this.userID).subscribe(
      (data: any) => {
        this.workoutData = this.workoutService.extractAllWorkoutData(data);
        this.updateWorkoutDataVariables();
        this.refreshChart();
      },
      (error: any) => {
        console.error('Error', error);
      }
    );
  }

  editWorkout(workoutId: string) {
    this.navigationService.selectInnerItem('workoutentry', workoutId);
  }

  deleteWorkout(workoutId: string) {
    const shouldDelete = window.confirm('Are you sure you want to delete this workout?');

    if (shouldDelete) {
      this.workoutService.deleteWorkout(workoutId).subscribe(
        (resultData: any) => {
          this.workoutAmount--;
          localStorage.setItem('workoutAmount', this.workoutAmount.toString());
          alert('Workout deleted successfully');
          this.getWorkoutDataFromMongo();
        },
        (error: any) => {
          console.error('Error deleting workout', error);
          alert('Error deleting workout');
        }
      );
    }
  }

  updateWorkoutDataVariables() {
    this.dateFilteredWorkoutData = this.workoutService.filterItemsByDate(this.workoutData, this.selectedDate);
    this.dataSource.data = this.dateFilteredWorkoutData;
    this.workoutDataTypesAndSets = this.workoutService.extractWorkoutTypeAndSets(this.dateFilteredWorkoutData);
  }

  // The following is all for table
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['workoutType', 'sets', 'actions'];
  updateTableCols() {
    this.displayedColumns = this.screenWidth > 575 ?
      ['workoutType', 'sets', 'reps', 'createdAt', 'actions'] :
      ['workoutType', 'sets', 'actions']
  }

  // The following is all for chart
  public workout_info_chart: any;
  showGraphToggle: boolean = false;
  initialCreateChart: boolean = true;
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

  refreshChart() {
    if (this.showGraphToggle || this.showGraphToggle === null) {
      if (this.initialCreateChart) {
        this.createChart();
        this.initialCreateChart = false;
      } else {
        this.updateChart();
      }
    }
  }

  updateChart() {
    // Put new data here
    let workoutTypes: string[] = [];
    let totalSets: number[] = [];
    workoutTypes = this.workoutDataTypesAndSets.map((item: any) => item.workoutType);
    totalSets = this.workoutDataTypesAndSets.map((item: any) => item.totalSets);
    if (workoutTypes.length == 0) {
      workoutTypes.push('No Workouts');
      totalSets.push(1);
    }
    this.workout_info_chart.data.labels = workoutTypes;
    this.workout_info_chart.data.datasets[0].data = totalSets;
    // this.workout_info_chart.options.plugins.title.text = this.selectedDateString;
    this.workout_info_chart.update();
  }

  createChart() {
    // Workout data source
    let workoutTypes: string[] = [];
    let totalSets: number[] = [];
    if (this.workoutDataTypesAndSets && this.workoutDataTypesAndSets.length !== 0) {
      workoutTypes = this.workoutDataTypesAndSets.map((item: any) => item.workoutType);
      totalSets = this.workoutDataTypesAndSets.map((item: any) => item.totalSets);
    } else {
      workoutTypes.push('No Workouts');
      totalSets.push(1);
    }
    // Workout Progress Line Chart
    this.workout_info_chart = new Chart("workoutInfoChart", {
      type: 'pie',
      data: {
        labels: workoutTypes,
        datasets: [{
          data: totalSets,
          label: 'Total sets',
          backgroundColor: this.chartColor,
          hoverOffset: 24,
        }]
      },
      options: {
        aspectRatio: 1,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // title: {
          //   display: true,
          //   text: this.selectedDateString,
          //   font: {
          //     size: 24,
          //     family: 'Arial',
          //   }
          // },
          legend: {
            // Legend styling
            display: false,
            position: 'bottom',
            labels: {
              padding: 24
            }
          },
        },
        // Pie chart styling, removing borders
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        layout: {
          padding: 24,
        },
      }
    });
  }

  fetchRecommendations() {
    // Check if recommendations are in localStorage
    const storedRecommendations = localStorage.getItem(`workoutRecommendations_${this.muscleGroup}`);

    if (storedRecommendations) {
      // If found in localStorage, use the stored data
      this.recommendedExercises = JSON.parse(storedRecommendations);
    } else {
      // If not found, make an API call to get workout recommendations
      const randomOffset = Math.floor(Math.random() * 10) + 1;
      console.log(`Fetching ${this.muscleGroup}, offset ${randomOffset}`)
      this.workoutService.getWorkoutExercises(this.muscleGroup, randomOffset).subscribe((data: any) => {
        this.recommendedExercises = data;
        // Store recommendations in localStorage
        localStorage.setItem(`workoutRecommendations_${this.muscleGroup}`, JSON.stringify(this.recommendedExercises));
      });
    }
  }

  refreshRecommendations() {
    localStorage.removeItem(`workoutRecommendations_${this.muscleGroup}`);
    this.fetchRecommendations();
  }
}
