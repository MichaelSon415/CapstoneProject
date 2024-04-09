import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-finder',
  templateUrl: './group-finder.component.html',
  styleUrls: ['./group-finder.component.css',
   '../../assets/Stylesheet/mainbox.css']
})
export class GroupFinderComponent {
  searchEntry: string = '';

  groupNames: string[] = ['Recommended Group 1', 'Recommended Group 2', 'Recommended Group 3'];
  recommendedGroups = ['Fitness for Cool People', 'Fitness for Old People', 'Fitness for Cool and Old People']
  groupInvites = ['Cool Group', 'Lame Group']

  constructor() { }

  ngOnInit(): void { }

  searchGroup() {

  }

  checkGroup() {
    console.log("Clicked on Group");
  }

}
