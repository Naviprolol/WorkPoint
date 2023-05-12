import { Component, Input, OnInit } from '@angular/core';
import { ICoworking } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';

@Component({
  selector: 'app-coworkings-list',
  templateUrl: './coworkings-list.component.html',
  styleUrls: ['./coworkings-list.component.css']
})
export class CoworkingsListComponent implements OnInit {

  @Input() coworking: ICoworking
  like = false

  ngOnInit(): void {

  }

  // constructor(private coworkingsService: CoworkingsService) {

  // }
  // ngOnInit(): void {
  //   this.coworkingsService.fetch().subscribe(coworkings => {
  //     this.coworkings = coworkings
  //     console.log('Coworking', coworkings)
  //   })
  // }

}
