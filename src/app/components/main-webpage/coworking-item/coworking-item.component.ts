import { Component, Input, OnInit } from '@angular/core';
import { ICoworking } from 'src/app/interfaces/interfaces';
import { coworkings } from 'src/app/data/coworkings';
import { ActivatedRoute } from '@angular/router';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coworking-item',
  templateUrl: './coworking-item.component.html',
  styleUrls: ['./coworking-item.component.css']
})
export class CoworkingItemComponent implements OnInit {
  coworking: any
  tags: any
  form: FormGroup

  constructor(private route: ActivatedRoute, private coworkingsService: CoworkingsService) {

  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap
    const coworkingIdFromRoute = String(routeParams.get('id'));
    this.coworking = coworkings.find(coworking => coworking.id === coworkingIdFromRoute)
    this.tags = this.coworking.tags

    // for (let image of this.coworking.photo) {
    //   if ()
    // }

    // this.coworkingsService.getById(coworkingIdFromRoute).subscribe(coworking => {
    //   this.coworking = coworking
    //   console.log('Coworking', coworking)
    // })
  }

}
