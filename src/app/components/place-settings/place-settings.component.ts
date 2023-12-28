import { Component, OnInit } from '@angular/core';
import { ICoworking, User } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-place-settings',
  templateUrl: './place-settings.component.html',
  styleUrls: ['./place-settings.component.css']
})
export class PlaceSettingsComponent implements OnInit {
  user: User
  userCoworkings: ICoworking[] = []

  constructor(
    private coworkingsService: CoworkingsService,
    private userService: UserService) { }

  ngOnInit() {

    this.userService.getUserByToken().subscribe(user => {
      this.user = user
    });

    this.coworkingsService.getCoworkingsByToken().subscribe(coworkings => {
      this.userCoworkings = coworkings
      this.userCoworkings.sort((a, b) => {
        const statusComparison = a.status.localeCompare(b.status);
        return statusComparison === 0 ? 0 : statusComparison;
      });
      console.log(this.userCoworkings)
    });
  }

  deleteCoworking(userCoworking: ICoworking) {
    const decision = window.confirm(`Вы уверены, что хотите удалить коворкинг ${userCoworking.name}?`)

    if (decision) {
      this.coworkingsService.delete(userCoworking.id).subscribe(() => {
        location.reload()
      }, // console.log('Успешно удалилось')
        error => console.log('Ошибка удаления коворкинга'),
      )
    }
  }

}
