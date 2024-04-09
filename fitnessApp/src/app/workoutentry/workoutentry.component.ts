import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { NavigationService } from 'src/services/navigation.service';
import { ActivatedRoute } from '@angular/router';

//for environment variables
import { WorkoutService } from 'src/workout/workout.service';
import { StorageService } from '../storage.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { workoutModel } from 'src/workout/workoutModel';

export interface WorkoutInfo {
  muscleGroup: string,
  exerciseName: string,
  sets: number,
  reps: number,
}

interface MuscleGroup {
  value: string;
  label: string;
}

//variable to use for accessing CRUD operation methods
var workoutList = WorkoutService;

@Component({
  selector: 'app-workoutentry',
  templateUrl: './workoutentry.component.html',
  styleUrls: ['./workoutentry.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class WorkoutentryComponent implements OnInit {
  workoutEntryForm!: FormGroup;
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private workoutService: WorkoutService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private getToken: GetToken,
  ) { }
  userID: string;
  userToken: string;

  goToAnotherPage(innerItem: string) {
    this.navigationService.selectInnerItem(innerItem);
  }

  exercisesList: any;
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
  muscleGroupValue: string;
  selectedExercise: string;
  formData: WorkoutInfo[] = [];
  dataSource = this.formData;
  workoutAmount: number = 0;
  workoutData: any[] = [];
  editingWorkoutHistory: boolean = false;
  editingObjectId: string;

  //test stuff
  workoutArray: any[] = [];
  private domain: string | undefined
  columnDisplay: string[] = [
    'muscleGroup',
    'exerciseName',
    'sets',
    'reps'
  ];

  //Form initializers & make each section required
  ngOnInit() {
    this.getUserIDFromToken();
    this.workoutEntryForm = this.formBuilder.group({
      muscleGroup: ['', Validators.required],
      exercise: ['', Validators.required],
      sets: [0, Validators.required],
      reps: [0, Validators.required],
      otherExercise: [{ value: '', disabled: true }, Validators.required]
    });
    //get previously saved amount
    const savedWorkoutAmount = localStorage.getItem('workoutAmount');
    if (savedWorkoutAmount !== null) {
      this.workoutAmount = +savedWorkoutAmount;
    }
    // this.workoutService.filterWorkoutLists("None").subscribe(item => {
    //   this.muscleGroups = item;
    //   console.log(this.muscleGroups);
    // });
    // Check if there is a workoutId parameter in the URL
    this.route.params.subscribe(params => {
      this.editingObjectId = params['workoutId'];
      if (this.editingObjectId) {
        // If workoutId is present, load the workout data and update the form
        this.loadWorkoutData(this.editingObjectId);
      }
    });
  }

  getUserIDFromToken() {
    this.userToken = this.storageService.getTokenValue();
    this.userID = this.getToken.getUserIdFromToken(this.userToken) || '0';
  }

  checkOtherInput() {
    const exerciseControl = this.selectedExercise;
    const otherExerciseControl = this.workoutEntryForm.get('otherExercise');
    if (exerciseControl && otherExerciseControl) {
      const isOtherSelected = exerciseControl === 'Other';
      if (isOtherSelected) {
        otherExerciseControl.enable();
      } else {
        otherExerciseControl.disable();
      }
    }
  }

  loadWorkoutData(workoutId: string) {
    this.workoutService.getWorkoutByUserId(this.userID).subscribe(
      (data: any) => {
        this.workoutData = this.workoutService.extractAllWorkoutData(data);
        const filteredWorkout = this.workoutService.filterItemsByObjectId(this.workoutData, workoutId);
        if (filteredWorkout.length > 0) {
          this.editingWorkoutHistory = true;
          const selectedWorkout = filteredWorkout[0];
          this.workoutEntryForm.patchValue({
            muscleGroup: selectedWorkout.workoutOption,
            // exercise: 'Other',
            sets: selectedWorkout.sets,
            reps: selectedWorkout.reps,
            otherExercise: selectedWorkout.workoutType,
          });
          this.muscleGroupValue = selectedWorkout.workoutOption;
          this.selectedExercise = 'Other';
          this.fetchWorkoutList();
          this.checkOtherInput();
        } else {
          alert("The workout history that you are looking for cannot be found.");
        }
      },
      (error: any) => {
        console.log('Error', error);
      }
    );
  }

  fetchWorkoutList() {
    if (this.muscleGroupValue) {
      // Check if recommendations are in localStorage
      const storedRecommendations = localStorage.getItem(`workoutRecommendations_${this.muscleGroupValue}`);
      if (storedRecommendations) {
        // If found in localStorage, use the stored data
        this.exercisesList = JSON.parse(storedRecommendations);
        if (this.exercisesList.length == 0) {
          localStorage.removeItem(`workoutRecommendations_${this.muscleGroupValue}`);
          this.fetchWorkoutList();
        }
      } else {
        this.workoutService.getWorkoutExercises(this.muscleGroupValue).subscribe((data: any) => {
          this.exercisesList = data;
          // Store recommendations in localStorage
          localStorage.setItem(`workoutRecommendations_${this.muscleGroupValue}`, JSON.stringify(this.exercisesList));
        });
      }
    }
  }

  //create function
  onSubmit() {
    let inputInfo =
    {
      "workoutOption": this.workoutEntryForm.controls['muscleGroup']!.value,
      "workoutType": this.selectedExercise === 'Other'
        ? this.workoutEntryForm.controls['otherExercise']!.value : this.selectedExercise,
      "sets": this.workoutEntryForm.controls['sets']!.value,
      "reps": this.workoutEntryForm.controls['reps']!.value,
      "userID": '0' // needs a helper function from users to retrieve user info based on given ID 
    }

    //Returns an observable that is subscribed to; need to learn how to make error interceptor for both calorie and workout 
    if (this.editingWorkoutHistory) {
      const newWorkoutModel = new workoutModel(
        inputInfo.workoutOption,
        inputInfo.workoutType,
        inputInfo.sets,
        inputInfo.reps,
        this.userID
      );
      this.workoutService.updateWorkout(this.editingObjectId, newWorkoutModel).subscribe({
        next: resultData => {
          alert('Workout Log Edited Successfully');
        }
      });
    } else {
      this.workoutService.createWorkout((inputInfo.workoutOption as string), (inputInfo.workoutType as string), (inputInfo.sets as number), (inputInfo.reps as number), (inputInfo.userID as string)).subscribe
        ({
          next: resultData => {
            alert("Workout Log Registered Successfully")
          }
        });
    }
    this.workoutEntryForm.reset();
    if (this.editingWorkoutHistory) {
      this.goToAnotherPage('workout_info');
    } else {
      //save amount to storage
      this.workoutAmount++;
      localStorage.setItem('workoutAmount', this.workoutAmount.toString());
    }
  }
}
