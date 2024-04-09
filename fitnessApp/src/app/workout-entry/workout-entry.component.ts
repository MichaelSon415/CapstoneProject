import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workout-entry',
  templateUrl: './workout-entry.component.html',
  styleUrls: ['./workout-entry.component.css']
})
export class WorkoutEntryComponent {
  workoutEntryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.workoutEntryForm = this.formBuilder.group({
      workoutOption: ['', Validators.required],
      workoutType: ['', Validators.required],
      sets: [, Validators.required],
      reps: [, Validators.required],
    });
  }
  workoutOptions: string[] = ["Push-ups", "Dead-lifts", "Calf Raises"];
  workoutTypes: string[] = ["Chest", "Hamstring", "Calfs"]

  workoutOption: string = "";
  workoutType: string = "";
  sets: number = 0;
  reps: number = 0;


  onSubmit(){
    if(this.workoutEntryForm.valid){
      this.workoutOption = this.workoutEntryForm.value.workoutName;
      this.workoutType = this.workoutEntryForm.value.workoutType;

      this.sets = this.workoutEntryForm.value.sets;
      this.reps = this.workoutEntryForm.value.reps;


    }

    this.workoutEntryForm.reset();


  }
}
