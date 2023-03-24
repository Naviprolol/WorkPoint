import { Component, Input } from '@angular/core';
import { coworkings } from 'src/app/data/coworkings';
import { ICoworking } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-coworkings-list',
  templateUrl: './coworkings-list.component.html',
  styleUrls: ['./coworkings-list.component.css']
})
export class CoworkingsListComponent {
  @Input() coworking: ICoworking
  like = false
  coworkings = coworkings
}
