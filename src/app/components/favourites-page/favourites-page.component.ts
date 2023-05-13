import { Component, OnInit } from '@angular/core';
import { coworkings as data } from 'src/app/data/coworkings';
import { ICoworking } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.css']
})
export class FavouritesPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  favourites_coworkings: ICoworking[] = data;

}
