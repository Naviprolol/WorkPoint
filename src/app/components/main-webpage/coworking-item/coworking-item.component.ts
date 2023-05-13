import { Component, Input, OnInit } from '@angular/core';
import { ICoworking, Review } from 'src/app/interfaces/interfaces';
import { coworkings } from 'src/app/data/coworkings';
import { ActivatedRoute } from '@angular/router';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/servises/review.service';
import { AuthService } from 'src/app/servises/auth.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { reviews as data } from 'src/app/data/reviews';

@Component({
  selector: 'app-coworking-item',
  templateUrl: './coworking-item.component.html',
  styleUrls: ['./coworking-item.component.css']
})
export class CoworkingItemComponent implements OnInit {
  coworking: any
  tags: any
  form: FormGroup
  review: Review
  allReviews: Review[] = data

  constructor(private route: ActivatedRoute,
    private coworkingsService: CoworkingsService,
    private reviewService: ReviewService,
    private authService: AuthService) {

  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap
    const coworkingIdFromRoute = String(routeParams.get('id'));
    this.coworking = coworkings.find(coworking => coworking.id === coworkingIdFromRoute)
    this.tags = this.coworking.tags

    this.form = new FormGroup({
      rating: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    })

    // for (let image of this.coworking.photo) {
    //   if ()
    // }

    // this.coworkingsService.getById(coworkingIdFromRoute).subscribe(coworking => {
    //   this.coworking = coworking
    //   console.log('Coworking', coworking)
    // })
  }

  onSubmit() {
    let obs$
    this.form.disable()
    obs$ = this.reviewService.create(this.reviewService.getUserIdByToken(this.authService.getToken()), this.coworking.id, this.form.value.rating, this.form.value.description, moment().format('DD.MM.YYYY'))
    obs$.subscribe(
      review => {
        this.review = review
        console.log('Изменения сохранены')
        this.form.enable()
      },
      error => {
        console.log('ERRRRROR!') // Снизу второй параметр — UserId, проверить как работает с бекендом
        console.log(this.reviewService.getUserIdByToken(this.authService.getToken()), this.coworking.id, this.form.value.rating, this.form.value.description, moment().format('DD.MM.YYYY'))
        this.form.enable()
      }
    )
  }

}
