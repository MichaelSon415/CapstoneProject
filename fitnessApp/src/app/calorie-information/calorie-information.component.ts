import { Component, HostListener, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CalorieService } from 'src/calorie/calorie.service';
import { StorageService } from '../storage.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-calorie-information',
  templateUrl: './calorie-information.component.html',
  styleUrls: ['./calorie-information.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class CalorieInformationComponent implements OnInit {
  constructor(
    private calorieService: CalorieService,
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
  goToAnotherPage(innerItem: string) {
    this.navigationService.selectInnerItem(innerItem);
  }

  userID: string;
  userToken: string;
  calorieData: any[] = [];
  foodNameAndCalorieData: any[];
  dateFilteredCalorieData: any[];
  selectedDate: Date;
  selectedDateString: string;

  ngOnInit(): void {
    // Screen width
    this.screenWidth = window.innerWidth;
    this.updateTableCols();
    // Chart toggle
    this.showGraphToggle = localStorage.getItem('savedshowGraphToggle') !== null ?
      (localStorage.getItem('savedshowGraphToggle') === 'true') : true;
    // Date picker 
    this.selectedDate = new Date();
    this.selectedDate.setHours(0, 0, 0, 0);
    this.selectedDateString = this.selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // Get Data from Mongo
    this.getUserIDFromToken();
    this.getCalorieDataFromMongo();
  }

  onDateChange(event: any) {
    // Call API to retrieve new data
    this.selectedDateString = this.selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    this.updateCalorieDataVariables();
    this.refreshChart();
  }

  getUserIDFromToken() {
    this.userToken = this.storageService.getTokenValue();
    this.userID = this.getToken.getUserIdFromToken(this.userToken) || '0';
  }

  getCalorieDataFromMongo() {
    this.calorieService.getCalorieByUserId(this.userID).subscribe(
      (data: any) => {
        this.calorieData = this.calorieService.extractAllCalorieData(data);
        this.updateCalorieDataVariables();
        this.refreshChart()
      },
      (error: any) => {
        console.error('Error', error);
      }
    );
  }

  editCalorie(calorieId: string) {
    this.navigationService.selectInnerItem('foodentry', calorieId);
  }

  deleteCalorie(calorieId: string) {
    const shouldDelete = window.confirm('Are you sure you want to delete this calorie info?');

    if (shouldDelete) {
      this.calorieService.deleteCalorie(calorieId).subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert('Calorie info deleted successfully');
          this.getCalorieDataFromMongo();
        },
        (error: any) => {
          console.error('Error deleting calorie info', error);
          alert('Error deleting calorie info');
        }
      );
    }
  }

  updateCalorieDataVariables() {
    this.dateFilteredCalorieData = this.calorieService.filterItemsByDate(this.calorieData, this.selectedDate);
    this.dataSource.data = this.dateFilteredCalorieData;
    this.foodNameAndCalorieData = this.calorieService.extractFoodAndCalorieData(this.dateFilteredCalorieData);
  }
  // The following is all for table
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['foodName', 'calories', 'actions'];
  updateTableCols() {
    this.displayedColumns = this.screenWidth > 575 ?
      ['foodName', 'carbs', 'fats', 'proteins', 'calories', 'createdAt', 'actions'] :
      ['foodName', 'calories', 'actions'];
  }

  // The following is all for chart
  public calorie_info_chart: any;
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
        this.initialCreateChart = false;
        this.createChart();
      } else {
        this.updateChart();
      }
    }
  }

  updateChart() {
    // Put new data here
    let foodNames: string[] = [];
    let calories: number[] = [];
    foodNames = this.foodNameAndCalorieData.map((item: any) => item.foodName);
    calories = this.foodNameAndCalorieData.map((item: any) => item.calories);
    if (foodNames.length == 0) {
      foodNames.push('No calorie data');
      calories.push(1);
    }
    this.calorie_info_chart.data.labels = foodNames;
    this.calorie_info_chart.data.datasets[0].data = calories;
    this.calorie_info_chart.update();
  }

  createChart() {
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
    // Workout Progress Line Chart
    this.calorie_info_chart = new Chart("calorieInfoChart", {
      type: 'pie',
      data: {
        labels: foodNames,
        datasets: [{
          data: calories,
          label: 'Calorie',
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
          //   text: this.selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
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
}
