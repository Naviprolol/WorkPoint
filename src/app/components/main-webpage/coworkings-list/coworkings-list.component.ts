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

  constructor() { }

  ngOnInit(): void {
    let photo = this.coworking.photo + ''
    this.coworking.photo = photo.split('# ')
    // this.coworking.photo.pop()
    // console.log(this.coworking.photo);
  }

  // constructor(private coworkingsService: CoworkingsService) {

  // }
  // ngOnInit(): void {
  //   this.coworkingsService.getAll().subscribe(coworkings => {
  //     this.coworkings = coworkings
  //     console.log('Coworking', coworkings)
  //   })
  // }

}
