import { Component, OnInit } from '@angular/core';
import { ICoworking, User } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class AdPlacesComponent implements OnInit {
  user: User
  userCoworkings: ICoworking[] = []

  constructor(
    private userService: UserService,
    private coworkingsService: CoworkingsService
  ) { }

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(user => {
      this.user = user;
    })
    this.coworkingsService.getCoworkingsByToken().subscribe(coworkings => {
      coworkings.forEach(coworking => {
        if (coworking.status === 'Одобрено') {
          this.userCoworkings.push(coworking)
        }
      });
      console.log(this.userCoworkings)
    });
  }
}
