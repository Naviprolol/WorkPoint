import { Component, OnInit } from '@angular/core';
import { ICoworking, User } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { UserService } from 'src/app/servises/user.service';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.css']
})
export class FavouritesPageComponent implements OnInit {
  user: User
  favoritePlaces: any = []
  favoriteCoworkings: ICoworking[] = []

  currentPage: number = 1;
  itemsPerPage: number = 4;


  constructor(
    private userService: UserService,
    private coworkingService: CoworkingsService
  ) { }

  ngOnInit() {
    this.userService.getUserByToken().subscribe(user => {
      this.user = user
    });

    this.userService.getFavoritePlaces().subscribe(favoritePlaces => {
      this.favoritePlaces = favoritePlaces
      this.favoritePlaces.forEach((favoriteCoworking: any) => {
        this.coworkingService.getCoworkingById(favoriteCoworking.place_id).subscribe((coworking) => {
          this.favoriteCoworkings.push(coworking)
        })
      });
    })
  }

}
