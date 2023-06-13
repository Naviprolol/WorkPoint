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
  newDescription: string
  photos: any

  constructor() { }

  ngOnInit(): void {
    let photo = this.coworking.photo + ''
    // this.coworking.photo = photo.split('#')
    // this.coworking.photo.pop()
    // console.log(this.coworking.photo)
    this.photos = this.coworking.photo.split('#');

    if (this.coworking.description.length > 151) {
      this.newDescription = this.coworking.description.substring(0, 151) + '...'
    }
    else {
      this.newDescription = this.coworking.description
    }
  }

}
