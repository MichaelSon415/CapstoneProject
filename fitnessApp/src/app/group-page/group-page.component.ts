import { Component } from '@angular/core';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css',
'../../assets/Stylesheet/mainbox.css']
})
export class GroupPageComponent {
  memberNames: string[] = ['Angel', 'Kevin', 'Kenry'];

  groupName: string = 'Cool Group';

  checkMember() {
    console.log("Clicked on Member");
  }
}
