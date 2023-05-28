import { Component, OnInit } from '@angular/core';
import { coworkings as data } from 'src/app/data/coworkings';
import { ICoworking, User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/servises/user.service';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.css']
})
export class FavouritesPageComponent implements OnInit {
  user: User


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserByToken().subscribe(user => {
      this.user = user
    });
  }

  favourites_coworkings: ICoworking[] = data;

}
