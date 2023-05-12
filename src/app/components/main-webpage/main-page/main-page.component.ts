import { Component, Input } from '@angular/core';
import { coworkings as data } from 'src/app/data/coworkings';
import { ICoworking } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
  term = ''
  Octyabrski: any = false
  Leninski: any = false
  Chkalovski: any = false
  ORDJ: any = false
  Kirovski: any = false
  JD: any = false
  VIZ: any = false
  Akadem: any = false

  office: any = false
  anticafe: any = false
  cafe: any = false

  kruglosutochno: any = false
  budni: any = false

  parking: any = false
  recreation_area: any = false
  conference_hall: any = false

  coworkings: ICoworking[] = data

  // coworkings: ICoworking[] = []
  length = this.coworkings.filter(p => p.name.toLowerCase().includes(this.term.toLowerCase()));

  allRegions = ['Академический', 'Верх-Исетский', 'Железнодорожный', 'Кировский', 'Ленинский', 'Октябрьский', 'Орджоникидзевский', 'Чкаловский']
  activeRegions = []

  // constructor(private coworkingsService: CoworkingsService) {

  // }

  // ngOnInit(): void {
  //   this.coworkingsService.fetch().subscribe(coworkings => {
  //     this.coworkings = coworkings
  //     console.log('Coworking', coworkings)
  //   })
  // }

}
