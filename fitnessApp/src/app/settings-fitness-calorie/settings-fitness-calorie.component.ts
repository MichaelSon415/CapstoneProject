import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';

export interface inputInfo {
  goal: string
  activityLevel: string
  disabilities: string
  disabilityList: string
  allergies: string
  allergyList: string
}

export interface ToggleSettings {
  kCalToggle: boolean;
  showGraphToggle: boolean;
  nutritionalRecommendationsToggle: boolean;
  showStepsToggle: boolean;
}


@Component({
  selector: 'app-settings-fitness-calorie',
  templateUrl: './settings-fitness-calorie.component.html',
  styleUrls: ['./settings-fitness-calorie.component.css', '../../assets/Stylesheet/mainbox.css']
})


export class SettingsFitnessCalorieComponent implements OnInit {
  goalForm!: FormGroup;
  calorieIntakeSettingForm!: FormGroup;

  goal: string = '';
  activityLevel: string = '';
  disabilities: string = '';
  disabilityList: string = '';
  allergies: string = '';
  allergyList: string = '';
  kCalToggle: boolean = true;
  showGraphToggle: boolean = true;
  nutritionalRecommendationsToggle: boolean = true;
  showStepsToggle: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  


  workoutOptions: string[] = ["Lose Weight", "Gain Weight", "Gain Muscle"];
  activityLevels: string[] = ["0-3", "3-5", "5-7"];
  yesNo: string[] = ["Yes", "No"];



  ngOnInit(): void {
    this.goalForm = this.formBuilder.group({
      goal: ['', Validators.required],
      activityLevel: ['', Validators.required],
      disabilities: ['', Validators.required],
      disabilityList: [''],
      allergies: ['', Validators.required],
      allergyList: [''],
    });
    this.calorieIntakeSettingForm = this.formBuilder.group({

      
      //kCalToggle will be set depending on the following comparisons, 
      //If the item obtained from storage is null then default to false (or true in the case of the other toggles)
      //If the item obtained from storage is not null then check if that item is equal to 'true', if it is then 
      //set the kCalToggle to true other wise set to false. 
      //same logic stands for the other toggles.
      kCalToggle: [localStorage.getItem('savedkCalToggle') !== null ? 
                   (localStorage.getItem('savedkCalToggle') === 'true') : 
                   true], 

                   
      showGraphToggle: [localStorage.getItem('savedshowGraphToggle') !== null ? 
                        (localStorage.getItem('savedshowGraphToggle') === 'true') : 
                        true], 
      nutritionalRecommendationsToggle: [localStorage.getItem('savednutritionalRecommendationsToggle') !== null ? 
                                         (localStorage.getItem('savednutritionalRecommendationsToggle') === 'true') : 
                                         true],  
      showStepsToggle: [localStorage.getItem('savedshowStepsToggle') !== null ? 
                        (localStorage.getItem('savedshowStepsToggle') === 'true') : 
                        true]



      
    });

    




    
    
  }


  saveVariables1(data: any) {
    localStorage.setItem('savedGoal', data.goal);


    localStorage.setItem('savedActivityLevel', data.fitnessLevel);
    localStorage.setItem('savedDisabilites', data.disabilities);
    
    localStorage.setItem('savedDisabilityList', data.disabilityList);
    localStorage.setItem('savedAllergies', data.allergies);

    localStorage.setItem('savedAllergyList', data.allergyList);
  }

//save the toggle data in local storage as a string
  saveVariables(data: any) {
    
localStorage.setItem('savedkCalToggle', data.kCalToggle.toString());
localStorage.setItem('savedshowGraphToggle', data.showGraphToggle.toString());
localStorage.setItem('savednutritionalRecommendationsToggle', data.nutritionalRecommendationsToggle.toString());
localStorage.setItem('savedshowStepsToggle', data.showStepsToggle.toString());





    

    
  }

  // ngOnInit(): void {
  //   this.goalSettingForm = this.formBuilder.group({
  //     goal: ['', Validators.required],
  //     activityLevel: ['', Validators.required],
  //     disabilities: ['', Validators.required],
  //     disablityList: [''],
  //     allergies: ['', Validators.required],
  //     allergyList: [''],
  //   });


  submitGoalSettingForm() {
    let inputInfo : inputInfo = {
      goal: this.goalForm.controls['goal']!.value,
      activityLevel: this.goalForm.controls['activityLevel']!.value,
      disabilities: this.goalForm.controls['disabilities']!.value,
      disabilityList: this.goalForm.controls['disabilityList']!.value,
      allergies: this.goalForm.controls['allergies']!.value,
      allergyList: this.goalForm.controls['allergyList']!.value,
    }
    // //old table stuff
    // // this.dataSource.push(inputInfo)
    // // this.table.renderRows();
    // //http post
    // this.http.post("http://localhost:9992/workout/create", inputInfo).subscribe((resultData: any) =>
    // {
    //   console.log(resultData);
    //   alert("workout log Registered Successfully")
    // });

    // //read function
    // this.http.get("http://localhost:9992/workout/read").subscribe((resultData: any) =>
    // {
    //   console.log(resultData);
    //   this.workoutArray = resultData.data;
    //   // for(let data of this.workoutArray)
    //   // {
    //   //   console.log(data);
    //   // }
    // });

    this.saveVariables(inputInfo);
    console.log(inputInfo);

    this.goalForm.reset();

    // this.resetPage();

    // this.router.navigate(['/personalfitnessgoals']);

    // Object.keys(this.goalForm.controls).forEach(key=> {
    //   const c = this.goalForm.get(key);
    //   c?.setErrors(null);

    // })

    // Object.keys(this.goalForm.controls).forEach(key=> {
    //   const c = this.goalForm.get(key);
    //   c?.setErrors(null);

    // })




  }

  //save toggles as an array and also save the variables so that the user's values are saved for later.
  submitCalorieIntakeSettingForm() {
    let inputData: ToggleSettings = {
      kCalToggle: this.calorieIntakeSettingForm.controls['kCalToggle']!.value,
      showGraphToggle: this.calorieIntakeSettingForm.controls['showGraphToggle']!.value,
      nutritionalRecommendationsToggle: this.calorieIntakeSettingForm.controls['nutritionalRecommendationsToggle']!.value,
      showStepsToggle: this.calorieIntakeSettingForm.controls['showStepsToggle']!.value,
    };
  
    this.saveVariables(inputData);
  }
}
