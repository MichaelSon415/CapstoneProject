import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { __values } from 'tslib';
import { Router } from '@angular/router';



//Interfaces

//Optional Values Are: disabilityList and allergyList
export interface initialGoals {
  goal: string
  activityLevel: string
  disabilities: string
  disabilityList: string
  allergies: string
  allergyList: string
}


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css', '../../assets/Stylesheet/login.css']
})
export class inputComponent implements OnInit {
  //dropdown menu stuff 
  activityDropDown = ''
  //radio buttons?
  disabilities: string[] = ["Arms", "Legs", "None"];



  initGoalForm!: FormGroup;
  initialGoal: string = "";
  initialActivityLevel: string = "";
  DisabilityText: string = "";
  AllergyText: string = "";

  //FormBuilder Constructor
  constructor(private formBuilder: FormBuilder, public router: Router) { };

  //FormBuilder
  ngOnInit(): void {
    this.initGoalForm = this.formBuilder.group({
      initialGoal: ['', Validators.required],
      initialActivityLevel: ['', Validators.required],
      DisabilityCheck: [''],
      DisabilityText: [{ value: '', disabled: true }],
      AllergyCheck: [''],
      AllergyText: [{ value: '', disabled: true }]
    });
  }




  //Methods
  public getEntry(): void {
    //checks for input of disabilities and food allergies
    var disability = String(this.DisabilityCheck)
    var foodAllergy = String(this.AllergyCheck)

    const goalData: initialGoals =
      {
        goal: String(this.initGoalForm.controls['initialGoal'].value),
        activityLevel: String(this.initGoalForm.controls['initialActivityLevel'].value),
        disabilities: String(this.initGoalForm.controls['DisabilityCheck'].value),
        disabilityList: String(''),
        allergies: String(this.initGoalForm.controls['AllergyCheck'].value),
        allergyList: String('')
      }

    

    //no allergies nor disabilities
    if (disability == 'No' && foodAllergy == 'No') {
      //gets values from forms
      const goalData: initialGoals =
      {
        goal: String(this.initGoalForm.controls['initialGoal'].value),
        activityLevel: String(this.initGoalForm.controls['initialActivityLevel'].value),
        disabilities: String(this.initGoalForm.controls['DisabilityCheck'].value),
        disabilityList: String(''),
        allergies: String(this.initGoalForm.controls['AllergyCheck'].value),
        allergyList: String('')
      }
      //sets disabilities and allergies to None
      goalData.disabilityList = 'None'
      goalData.allergyList = 'None'
    }
    //disabilities only
    else if (disability == 'Yes' && foodAllergy == 'No') {
      const goalData: initialGoals =
      {
        goal: String(this.initGoalForm.controls['initialGoal'].value),
        activityLevel: String(this.initGoalForm.controls['initialActivityLevel'].value),
        disabilities: String(this.initGoalForm.controls['DisabilityCheck'].value),
        disabilityList: String(this.initGoalForm.controls['DisabilityText'].value),
        allergies: String(this.initGoalForm.controls['AllergyCheck'].value),
        allergyList: String('')
      }
      //sets allergies to None
      goalData.allergyList = 'None'
    }
    //allergies only
    else if (disability == 'No' && foodAllergy == 'Yes') {
      const goalData: initialGoals =
      {
        goal: String(this.initGoalForm.controls['initialGoal'].value),
        activityLevel: String(this.initGoalForm.controls['initialActivityLevel'].value),
        disabilities: String(this.initGoalForm.controls['DisabilityCheck'].value),
        disabilityList: String(''),
        allergies: String(this.initGoalForm.controls['AllergyCheck'].value),
        allergyList: String(this.initGoalForm.controls['AllergyText'].value)
      }
      //sets disabilities to None
      goalData.disabilityList = 'None'
    }
    //have both disabilities and allergies
    else {
      const goalData: initialGoals =
      {
        goal: String(this.initGoalForm.controls['initialGoal'].value),
        activityLevel: String(this.initGoalForm.controls['initialActivityLevel'].value),
        disabilities: String(this.initGoalForm.controls['DisabilityCheck'].value),
        disabilityList: String(this.initGoalForm.controls['DisabilityText'].value),
        allergies: String(this.initGoalForm.controls['AllergyCheck'].value),
        allergyList: String(this.initGoalForm.controls['AllergyText'].value)
      }
    }

    this.saveVariables(goalData);
    console.log("Here is goal data", goalData);
  }

  //getters for radio buttons
  //disability
  get DisabilityCheck() {
    return this.initGoalForm.get("DisabilityCheck")!.value
  }

  //AllergyCheck
  get AllergyCheck() {
    return this.initGoalForm.get("AllergyCheck")!.value
  }


  //enablers/disablers for text boxes

  //Disability
  toggleEnableDisability() {
    this.initGoalForm.controls['DisabilityText'].enable()
  }
  toggleDisableDisability() {
    this.initGoalForm.controls['DisabilityText'].disable()
  }

  //Allergy
  toggleEnableAllergy() {
    this.initGoalForm.controls['AllergyText'].enable()
  }
  toggleDisableAllergy() {
    this.initGoalForm.controls['AllergyText'].disable()
  }


  // this.initGoalForm = this.formBuilder.group({
  //   initialGoal: ['', Validators.required],
  //   initialActivityLevel: ['', Validators.required],
  //   DisabilityCheck: [''],
  //   DisabilityText: [{ value: '', disabled: true }],
  //   AllergyCheck: [''],
  //   AllergyText: [{ value: '', disabled: true }]
  // });



  saveVariables(data: initialGoals) {
    localStorage.setItem('savedGoal', data.goal);
    let va = localStorage.getItem('savedGoal');
    console.log("here is va", va);


    // localStorage.setItem('savedActivityLevel', data.activityLevel);
    // localStorage.setItem('savedDisabilites', data.disabilities);
    
    // localStorage.setItem('savedDisabilityList', data.disabilityList);
    // localStorage.setItem('savedAllergies', data.allergies);

    // localStorage.setItem('savedAllergyList', data.allergyList);
  }
  

  navigate(){
    this.router.navigateByUrl('');

  }


}
