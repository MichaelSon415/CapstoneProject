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
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent {
  /*tiles: Tile[] = [
    {text: 'Client Name', cols: 12, rows: 1, classColumn: "one",
      CSSStyle: {"border-bottom": '1px solid grey', }, Image:'../assets/profileImage.png' },

    {text: 'Client Details', cols: 12, rows: 1, classColumn: "one",
      CSSStyle: {}, Image:'../assets/images.png' },
  ]*/
  
}
