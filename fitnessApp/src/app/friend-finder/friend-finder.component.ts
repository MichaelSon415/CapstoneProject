import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user/user.service';

@Component({
  selector: 'app-friend-finder',
  templateUrl: './friend-finder.component.html',
  styleUrls: ['./friend-finder.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class FriendFinderComponent {
  searchEntry: string = '';

  usersArray: any[] = [];
  usernames: string[] = ['Max', 'Max2', 'Max3', 'Max4'];
  searchedUsers: any = '';
  tempFriendRequests = ['Kenry', 'Kevin']

  constructor(private userService: UserService) {
    this.getAllUser();
    this.searchUser();
  }

  ngOnInit(): void {

   }

  getAllUser() {
    this.userService.getAllUser().subscribe((resultData: any) => {
      console.log(resultData);

      this.usersArray = resultData.data;
    });
  }

  searchUser() {
    console.log(this.searchEntry + "Look HERE")
    this.userService.getOneUser(this.searchEntry).subscribe((resultData: any) => {
      console.log(resultData);

      this.searchedUsers = resultData.data.username;
    });

  }

  checkUser() {
    console.log("User clicked!")
  }

}
