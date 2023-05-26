import { Component, OnInit } from '@angular/core';
import { ICoworking, User } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { ReviewService } from 'src/app/servises/review.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-place-settings',
  templateUrl: './place-settings.component.html',
  styleUrls: ['./place-settings.component.css']
})
export class PlaceSettingsComponent implements OnInit {

  userCoworkings: ICoworking[] = []

  constructor(
    private coworkingsService: CoworkingsService,
    private reviewService: ReviewService,
    private userService: UserService) { }

  ngOnInit() {

    this.coworkingsService.getCoworkingsByToken().subscribe(coworkings => {
      this.userCoworkings = coworkings
    });
  }

}
