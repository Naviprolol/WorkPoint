import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiHideSelectedPipe } from '@taiga-ui/kit';
import { ICoworking, User } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { ReviewService } from 'src/app/servises/review.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-coworkings-list',
  templateUrl: './coworkings-list.component.html',
  styleUrls: ['./coworkings-list.component.css']
})
export class CoworkingsListComponent implements OnInit {

  @Input() coworking: ICoworking
  newDescription: string
  photos: any
  user: User
  favoritePlaces: any
  favoriteIDs: number[] = []
  rating: number[] = []
  averageRating: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    let photo = this.coworking.photo + ''
    // this.coworking.photo = photo.split('#')
    // this.coworking.photo.pop()
    // console.log(this.coworking.photo)
    this.photos = this.coworking.photo.split('#');

    if (this.coworking.description.length > 151) { // 164
      this.newDescription = this.coworking.description.substring(0, 151) + '...'
    }
    else {
      this.newDescription = this.coworking.description
    }

    this.userService.getUserByToken().subscribe(user => {
      this.user = user
    })

    this.userService.getFavoritePlaces().subscribe(favoritePlaces => {
      this.favoritePlaces = favoritePlaces
      this.favoritePlaces.forEach((favoritePlace: any) => {
        if (!this.favoriteIDs.includes(favoritePlace.place_id)) {
          this.favoriteIDs.push(favoritePlace.place_id)
        }
      });
    })

    this.reviewService.getReviewsByIdPlace(this.coworking.id).subscribe((reviews) => {
      this.rating = reviews.map(review => review.rank);
      const sum = this.rating.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const average = sum / this.rating.length;
      this.averageRating = average;
      this.averageRating = parseFloat(average.toFixed(2));
      if (Number.isNaN(this.averageRating) || this.averageRating === null) {
        this.averageRating = 0;
      }
    })

  }

  OnLikeBtnClick() {
    const favoritePlace = this.favoritePlaces.find((place: any) => place.place_id === this.coworking.id);

    if (favoritePlace) {
      this.userService.deleteFavoritePlace(favoritePlace.id).subscribe(() => {
        this.favoriteIDs = this.favoriteIDs.filter(id => id !== this.coworking.id);
        this.refreshFavoritePlaces()
      })
    }

    else {
      this.userService.addFavoritePlace(this.coworking.id, this.user.id).subscribe(() => {
        this.favoriteIDs.push(this.coworking.id)
        this.refreshFavoritePlaces()
      })
    }
  }

  refreshFavoritePlaces() {
    this.userService.getFavoritePlaces().subscribe(favoritePlaces => {
      this.favoritePlaces = favoritePlaces;
    });
  }
}
