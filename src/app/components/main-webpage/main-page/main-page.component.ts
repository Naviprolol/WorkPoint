import { Component, Input } from '@angular/core';
import { coworkings as data } from 'src/app/data/coworkings';
import { ICoworking } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
  coworkings: ICoworking[] = data
}
