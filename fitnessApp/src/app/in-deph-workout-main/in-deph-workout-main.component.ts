import { Component } from '@angular/core';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  CSSStyle: Object;
  Image: string;

  classColumn: string;
 }

@Component({
  selector: 'app-in-deph-workout-main',
  templateUrl: './in-deph-workout-main.component.html',
  styleUrls: ['./in-deph-workout-main.component.css']
})
// export class InDephWorkoutMainComponent {
//   tiles: Tile[] = [
//     {text: 'Calorie Information',  cols: 6, rows: 1, CSSStyle: border: '1px solid grey', borderRight: '1px solid grey' },
//     {text: 'Workout Information', cols: 6, rows: 1, CSStyle: 'calories', border: '1px solid grey', borderRight: '0px solid grey'},
//     {text: 'Achievements', cols: 4, rows: 1, border: '1px solid grey', borderRight: '1px solid grey' },
//     {text: 'Goals', cols: 4, rows: 1, border: '1px solid grey', borderRight: '1px solid grey'},
//     {text: 'Mood', cols: 4, rows: 1, border: '1px solid grey', borderRight: '0px solid grey'},
//     {text: 'Client Information', cols: 12, rows: 1, border: '0px solid grey', borderRight: '0px solid grey'},
//     ];
// }

export class InDephWorkoutMainComponent {
  tiles: Tile[] = [
    {text: 'Calorie Information',  cols: 6, rows: 1, classColumn: "one",
      CSSStyle: {"border-bottom": '1px solid grey', "border-right": '1px solid grey', "border-top-left-radius": '25px'}, Image: "../assets/google.png" },
    
    {text: 'Workout Information', cols: 6, rows: 1, classColumn: "one",
      CSSStyle: {"border-bottom": '1px solid grey', }, Image:'' },
    
    {text: 'Achievements', cols: 4, rows: 1, classColumn: "one",
      CSSStyle: {"border-right": '1px solid grey'}, Image:"" },
    
    {text: 'Goals', cols: 4, rows: 1, classColumn: "one",
      CSSStyle: {"border-right": '1px solid grey'}, Image:"" },
    
    {text: 'Mood', cols: 4, rows: 1, classColumn: "one",
      CSSStyle: {}, Image:"" },
    
    {text: 'Client Information', cols: 12, rows: 1, classColumn: "three",
      CSSStyle: {"border-top": '1px solid grey'}, Image:"../assets/images.png" },
    ];
}