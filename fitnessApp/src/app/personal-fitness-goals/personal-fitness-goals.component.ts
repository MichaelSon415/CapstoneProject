import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';

export interface inputInfo {
  goal: string
  activityLevel: string
  disabilities: string
  disabilityList: string
  allergies: string
  allergyList: string
}




@Component({
  selector: 'app-personal-fitness-goals',
  templateUrl: './personal-fitness-goals.component.html',
  styleUrls: ['./personal-fitness-goals.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class PersonalFitnessGoalsComponent implements OnInit {
  goalForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private navigationService: NavigationService) { }

  goToAnotherPage(innerItem: string) {
    this.navigationService.selectInnerItem(innerItem);
  }

  workoutOptions: string[] = ["Lose Weight", "Gain Weight", "Gain Muscle"];
  activityLevels: string[] = ["0-3", "3-5", "5-7"];
  yesNo: string[] = ["Seafood", "Fruit", "None"];
  disabilities: string[] = ["Arms", "Legs", "None"];


  ngOnInit() {
    this.goalForm = this.formBuilder.group({
      goal: ['', Validators.required],
      activityLevel: ['', Validators.required],
      disabilities: ['', Validators.required],
      disabilityList: [''],
      allergies: ['', Validators.required],
      allergyList: [''],
    });
  }

  // resetPage(): void{
  //   goal: ['']
  // }


  onSubmit() {


    let inputInfo: inputInfo = {
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


  saveVariables(data: inputInfo) {
    localStorage.setItem('savedGoal', data.goal);


    // localStorage.setItem('savedActivityLevel', data.activityLevel);
    // localStorage.setItem('savedDisabilites', data.disabilities);

    // localStorage.setItem('savedDisabilityList', data.disabilityList);
    // localStorage.setItem('savedAllergies', data.allergies);

    // localStorage.setItem('savedAllergyList', data.allergyList);
  }
}
