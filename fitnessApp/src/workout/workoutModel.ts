//make it just the fields from the js file
export class workoutModel {
    //parameters
    workoutOption: string
    workoutType: string
    sets: number
    reps: number
    userID: string

    constructor(myWorkoutOption: string, myWorkoutType: string, mySets: number, myReps: number, myUserID: string)
    {
        this.workoutOption = myWorkoutOption
        this.workoutType = myWorkoutType
        this.sets = mySets
        this.reps = myReps
        this.userID = myUserID
    };
}
