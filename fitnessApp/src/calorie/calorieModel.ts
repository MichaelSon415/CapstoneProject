export class calorieModel {
    //parameters

    //names
    // "foodName": this.foodEntryForm.controls['foodName']!.value,	
    // "calories": this.foodEntryForm.controls['calories']!.value,
    // "carbs": this.foodEntryForm.controls['carbs']!.value,
    // "fats": this.foodEntryForm.controls['fats']!.value,
    // "proteins": this.foodEntryForm.controls['proteins']!.value,

    foodName: string 
    calories: string
    carbs: string
    fats: string
    proteins: string
    userID: string

    constructor(myFoodName: string, myCalories: string, myCarbs: string, myFats: string, myProteins: string, myUserID: string)
    {
        this.foodName = myFoodName;
        this.calories = myCalories;
        this.carbs = myCarbs;
        this.fats = myFats;
        this.proteins = myProteins;
        this.userID = myUserID;
    }
}