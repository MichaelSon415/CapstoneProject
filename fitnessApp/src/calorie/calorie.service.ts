import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { calorieModel } from './calorieModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class CalorieService {
  //Base URL + endpoint specification
  private endpoint = 'calorie';
  private domain: string | undefined;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }



  // foodName: string 
  // calories: string
  // carbs: string
  // fats: string
  // proteins: string

  //Create 
  createCalorie(foodName: string, calories: string, carbs: string, fats: string, proteins: string, userID: string): Observable<calorieModel> {
    var enteredCalorie = new calorieModel(foodName, calories, carbs, fats, proteins, userID);
    return this.http.post<calorieModel>(this.domain + this.endpoint + '/create/', enteredCalorie);
  }

  //Read All (for individual user) 

  //Read All for user based on userID
  getCalorie(): Observable<calorieModel> {
    return this.http.get<calorieModel>(this.domain + this.endpoint + '/readUserID/');
  }

  getCalorieByUserId(userId: string): Observable<calorieModel> {
    return this.http.get<calorieModel>(this.domain + this.endpoint + '/readUserID/' + userId);
  }

  //Update Function by object Id (need to test but should work based on filter workout function)
  updateCalorie(objectId: string, newCalorie: calorieModel): Observable<calorieModel> {
    return this.http.patch<calorieModel>(this.domain + this.endpoint + '/update/' + objectId, newCalorie);
  }

  //delete function by object Id (need to test but should work based on filter workout function)
  deleteCalorie(objectId: string): Observable<calorieModel> {
    return this.http.delete<calorieModel>(this.domain + this.endpoint + '/delete/' + objectId);
  }

  // Services for frontend
  extractAllCalorieData(data: any): any[] {
    if (Array.isArray(data.data)) {
      return data.data.map((item: any) => ({ ...item }));
    }
    return [];
  }

  dateToString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  filterItemsByDate(data: any[], targetDate: Date): any[] {
    const targetDatePart = this.dateToString(targetDate);

    return data.filter(item => {
      const itemDate = this.dateToString(new Date(item.createdAt));
      return itemDate === targetDatePart;
    });
  }

  filterItemsByObjectId(data: any[], targetObjectId: string): any[] {
    return data.filter(item => item._id === targetObjectId);
  }

  extractFoodAndCalorieData(data: any): { foodName: string, calories: number }[] {
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        foodName: item.foodName,
        calories: item.calories
      }));
    }
    return [];
  }
}
