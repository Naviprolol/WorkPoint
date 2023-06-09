import { Component, Input, OnInit } from '@angular/core';
import { ICoworking, Review, User } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/servises/review.service';
import { AuthService } from 'src/app/servises/auth.service';
import * as moment from 'moment';
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
  allReviews: Review[] = []
  coworkings: ICoworking[] = []
  userPlaces: ICoworking[] = []
  user: User
  sortedItems: Review[] = []

  isReviewSend: boolean = false
  showFullDescription: boolean = false
  UPDay: boolean = true
  UPRating: boolean = false
  isButtonDayActive: boolean = true
  isButtonRatingActive: boolean = false

  constructor(private route: ActivatedRoute,
    private coworkingsService: CoworkingsService,
    private reviewService: ReviewService,
    private userService: UserService,
    private router: Router) {

  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap
    const coworkingIdFromRouteSTR = String(routeParams.get('id'));
    const coworkingIdFromRouteINT = Number(routeParams.get('id'));


    this.coworkingsService.getCoworkingById(coworkingIdFromRouteSTR).subscribe(coworking => {
      this.coworking = coworking
      this.coworking.photo = this.coworking.photo.split('#')
      // console.log(this.coworking.photo)
      this.tags = this.coworking.tags
    })

    //
    this.coworkingsService.getCoworkingsByToken().subscribe(coworkings => {
      this.userPlaces = coworkings
      // console.log('userPlaces', this.userPlaces)
    })
    //


    this.form = new FormGroup({
      rating: new FormControl(null, [Validators.required]),
      description: new FormControl('')
    })

    this.userService.getUserByToken().subscribe(user => {
      this.user = user
      // console.log('user', this.user.name)
    });

    this.reviewService.getReviewsByIdPlace(coworkingIdFromRouteINT).subscribe(reviews => {
      this.allReviews = reviews;
      this.allReviews.sort((reviewFirst: Review, reviewSecond: Review) => moment(reviewSecond.created_at).diff(moment(reviewFirst.created_at)))

      this.allReviews.forEach(review => {
        review.formattedDate = moment(review.created_at).format('DD.MM.YYYY HH:mm');
      });
    })
  }

  sortByDay() {
    if (this.UPDay) {
      this.sortedItems = this.allReviews.sort((reviewFirst: Review, reviewSecond: Review) => moment(reviewSecond.created_at).diff(moment(reviewFirst.created_at)))
    }
    else {
      this.sortedItems = this.allReviews.sort((reviewFirst: Review, reviewSecond: Review) => moment(reviewFirst.created_at).diff(moment(reviewSecond.created_at)))
    }
  }

  sortByRating() {
    if (this.UPRating) {
      this.sortedItems = this.allReviews.sort((reviewFirst: Review, reviewSecond: Review) => reviewSecond.rank - reviewFirst.rank)
    }
    else {
      this.sortedItems = this.allReviews.sort((reviewFirst: Review, reviewSecond: Review) => reviewFirst.rank - reviewSecond.rank)
    }
  }

  toggleButtonDay() {
    if (this.isButtonDayActive) {
      return
    }
    this.isButtonDayActive = !this.isButtonDayActive;
    this.isButtonRatingActive = false;
  }

  toggleButtonRating() {
    if (this.isButtonRatingActive) {
      return
    }
    this.isButtonRatingActive = !this.isButtonRatingActive;
    this.isButtonDayActive = false;
  }

  onSubmit() {
    const routeParams = this.route.snapshot.paramMap

    this.form.disable()
    this.reviewService.create(0, this.coworking.id, this.form.value.rating, this.form.value.description).subscribe(
      (review) => {
        this.review = review
        // console.log('Изменения сохранены')
        this.isReviewSend = true
        location.reload()
        this.form.enable()
      },
      (error) => {
        console.log('ERRRRROR!') // Снизу второй параметр — UserId, проверить как работает с бекендом
        console.log(this.coworking.id, this.form.value.rating, this.form.value.description)
        this.form.enable()
      }
    );
  }

  toggleUPDay() {
    this.UPDay = !this.UPDay
  }

  toggleUPRating() {
    this.UPRating = !this.UPRating
  }

}
