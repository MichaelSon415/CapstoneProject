export class userModel 
{
    //   "firstName" : this.Registration.controls['firstName']!.value,
    //   "lastName" : this.Registration.controls['lastName']!.value,
    //   "email" : this.Registration.controls['email']!.value,
    //   "dateOfBirth" : this.Registration.controls['dateOfBirth']!.value,
    //   "trainerCheck" : this.Registration.controls['trainerCheck']!.value,
    //   "username" : this.Registration.controls['username']!.value,
    //   "password" : this.Registration.controls['password']!.value,
    //   "confirmPassword" : this.Registration.controls['confirmPassword']!.value,

    //parameters
    firstName: string
    lastName: string
    email: string
    dateOfBirth: string
    trainerCheck: string 
    username: string 
    password: string 
    confirmPassword: string
    profilePicture: string

    constructor(myFirstName: string, myLastName: string, myEmail: string, myDateOfBirth: string, myTrainerCheck: string, myUsername: string, myPassword: string, myConfirmPassword: string,myProfilePicture:string )
    {
        this.firstName = myFirstName
        this.lastName = myLastName
        this.email = myEmail
        this.dateOfBirth = myDateOfBirth
        this.trainerCheck = myTrainerCheck
        this.username = myUsername
        this.password = myPassword
        this.confirmPassword = myConfirmPassword
        this.profilePicture = myProfilePicture
    }

}