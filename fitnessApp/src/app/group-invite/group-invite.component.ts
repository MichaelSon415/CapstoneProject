import { Component } from '@angular/core';

@Component({
  selector: 'app-group-invite',
  templateUrl: './group-invite.component.html',
  styleUrls: ['./group-invite.component.css',
  '../../assets/Stylesheet/mainbox.css']
})
export class GroupInviteComponent {
  searchEntry: string = '';

  usernames: string[] = ['Max', 'Max2', 'Max3', 'Max4'];
  recommendedUsers = ['Max', 'Michael', 'Angel', 'Katherine', 'Karen', 'Kenry', 'Kevin'];
  tempFriendRequests = ['Kenry', 'Kevin']

  constructor() { }

  ngOnInit(): void { }

  searchUser() {

  }

  checkUser() {
    console.log("Clicked on user");
  }
}
