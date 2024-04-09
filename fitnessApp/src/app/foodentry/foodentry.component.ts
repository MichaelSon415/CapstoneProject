import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CalorieService } from 'src/calorie/calorie.service';
import { NavigationService } from 'src/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { calorieModel } from 'src/calorie/calorieModel';
import { filter } from 'rxjs';

export interface FoodInfo {
  foodName: string,
  calories: string,
  carbs: string,
  fats: string,
  proteins: string,
}

@Component({
  selector: 'app-foodentry',
  templateUrl: './foodentry.component.html',
  styleUrls: ['./foodentry.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class FoodentryComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private calorieService: CalorieService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private getToken: GetToken,
  ) { }

  goToAnotherPage(innerItem: string) {
    this.navigationService.selectInnerItem(innerItem);
  }

  formData: FoodInfo[] = [];
  dataSource = this.formData;
  userID: string;
  userToken: string;
  foodEntryForm!: FormGroup;
  calorieData: any[] = [];
  editingCalorieHistory: boolean = false;
  editingObjectId: string;

  ngOnInit(): void {
    this.getUserIDFromToken();
    this.foodEntryForm = this.formBuilder.group({
      foodName: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      fats: ['', Validators.required],
      proteins: ['', Validators.required],
    });
    this.route.params.subscribe(params => {
      this.editingObjectId = params['calorieId'];
      if (this.editingObjectId) {
        this.loadCalorieData(this.editingObjectId);
      }
    });
  }

  getUserIDFromToken() {
    this.userToken = this.storageService.getTokenValue();
    this.userID = this.getToken.getUserIdFromToken(this.userToken) || '0';
  }

  loadCalorieData(calorieId: string) {
    this.calorieService.getCalorieByUserId(this.userID).subscribe(
      (data: any) => {
        this.calorieData = this.calorieService.extractAllCalorieData(data);
        const filteredCalorie = this.calorieService.filterItemsByObjectId(this.calorieData, calorieId);
        if (filteredCalorie.length > 0) {
          this.editingCalorieHistory = true;
          const selectedCalorie = filteredCalorie[0];
          this.foodEntryForm.patchValue({
            foodName: selectedCalorie.foodName,
            calories: selectedCalorie.calories,
            carbs: selectedCalorie.carbs,
            fats: selectedCalorie.fats,
            proteins: selectedCalorie.proteins,
          });
        } else {
          alert("The calorie history that you are looking for cannot be found.");
        }
      },
      (error: any) => {
        console.log('Error', error);
      }
    );
  }

  columnDisplay: string[] = [
    'foodName',
    'calories',
    'carbs',
    'fats',
    'proteins'
  ];

  onSubmit() {

    let inputInfo =
    {
      "foodName": this.foodEntryForm.controls['foodName']!.value,
      "calories": this.foodEntryForm.controls['calories']!.value,
      "carbs": this.foodEntryForm.controls['carbs']!.value,
      "fats": this.foodEntryForm.controls['fats']!.value,
      "proteins": this.foodEntryForm.controls['proteins']!.value,
      "userID": '0'
    }

    //Create
    // this.http.post("http://localhost:9992/calorie/create", inputInfo).subscribe((resultData: any) =>
    // {
    //   console.log(resultData);
    //   alert("Calorie Log Successful")
    // });

    if (this.editingCalorieHistory) {
      const newCalorieModel = new calorieModel(
        inputInfo.foodName,
        inputInfo.calories,
        inputInfo.carbs,
        inputInfo.fats,
        inputInfo.proteins,
        this.userID
      );
      this.calorieService.updateCalorie(this.editingObjectId, newCalorieModel).subscribe({
        next: resultData => {
          alert('Calorie Log Edited Successfully');
        }
      });
    } else {
      this.calorieService.createCalorie(inputInfo.foodName as string, inputInfo.calories as string, inputInfo.carbs as string, inputInfo.fats as string, inputInfo.proteins as string, inputInfo.userID as string).subscribe
        ({
          next: resultData => {
            console.log(resultData);
            alert("Food Item Registered Successfully");
          }
        });
    }


    //Read
    // this.http.get("http://localhost:9992/calorie/read").subscribe((resultData: any) =>
    // {
    //   console.log(resultData.data);
    // });

    this.calorieService.getCalorie().subscribe({
      next: resultData => {
        console.log(resultData);
      }
    })
    this.foodEntryForm.reset();
    if (this.editingCalorieHistory) {
      this.goToAnotherPage('calorieinformation');
    }
  }
}
