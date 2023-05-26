import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/servises/auth.service';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { ReviewService } from 'src/app/servises/review.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  form: FormGroup
  user: User

  constructor(private coworkingsService: CoworkingsService,
    private userService: UserService,
    private reviewService: ReviewService,
    private authService: AuthService) {

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      city: new FormControl(null),
      phone: new FormControl(null),
    })
  }

  onSubmit() {
    let obs$
    this.form.disable()

    obs$ = this.reviewService.getUserByToken()
      .pipe(
        mergeMap(user => {
          console.log(user.id)
          return this.userService.updateUser(user.id, this.form.value.name, this.form.value.surname, this.form.value.city, this.form.value.phone)
        })
      )

    obs$.subscribe(
      user => {
        this.user = user
        console.log('Изменения сохранены')
        this.form.enable()
      },
      error => {
        console.log('ERRRRROR!')
        console.log(this.user)
        this.form.enable()
      }
    )
  }

}
