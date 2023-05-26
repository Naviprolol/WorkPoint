import { Component, Input, OnInit } from '@angular/core';
import { ICoworking, Review, User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/servises/review.service';
import { AuthService } from 'src/app/servises/auth.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { reviews as data } from 'src/app/data/reviews';
import { mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/servises/user.service';

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
  coworkings: ICoworking[] = []
  userPlaces: ICoworking[] = []
  user: User

  constructor(private route: ActivatedRoute,
    private coworkingsService: CoworkingsService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private userService: UserService) {

  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap
    const coworkingIdFromRoute = String(routeParams.get('id'));

    this.coworkingsService.getCoworkingById(coworkingIdFromRoute).subscribe(coworking => {
      this.coworking = coworking
      this.coworking.photo = this.coworking.photo.split('# ')
      this.coworking.photo.pop()
      this.tags = this.coworking.tags
    })

    //
    this.coworkingsService.getCoworkingsByToken().subscribe(coworkings => {
      this.userPlaces = coworkings
      console.log('userPlaces', this.userPlaces)
    })
    //


    this.form = new FormGroup({
      rating: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    })

    this.userService.getUserByToken().subscribe(user => {
      this.user = user
      console.log('user', this.user.name)
    });
  }

  onSubmit() {
    this.form.disable()
    this.reviewService.create(0, this.coworking.id, this.form.value.rating, this.form.value.description).subscribe(
      (review) => {
        this.review = review
        console.log('Изменения сохранены')
        this.form.enable()
      },
      (error) => {
        console.log('ERRRRROR!') // Снизу второй параметр — UserId, проверить как работает с бекендом
        console.log(this.coworking.id, this.form.value.rating, this.form.value.description)
        this.form.enable()
      }
    );
  }

}
