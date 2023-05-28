import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-ad-business',
  templateUrl: './ad-business.component.html',
  styleUrls: ['./ad-business.component.css']
})
export class AdBusinessComponent implements OnInit {
  form: FormGroup
  report: any
  accessText: string = 'Все поля должны быть заполнены'
  user: User

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    })

    this.userService.getUserByToken().subscribe(user => {
      this.user = user
      console.log('user', this.user.role_id)
    });
  }

  onClick() {
    if (this.form.disabled) {
      this.accessText = 'Все поля должны быть заполнены'
    }
  }

  onSubmit() {
    let obs$
    this.form.disable()

    obs$ = this.userService.report(this.form.value.name, this.form.value.city, this.form.value.address, this.form.value.price, this.form.value.email, 'string')

    obs$.subscribe(
      report => {
        this.report = report
        this.accessText = 'Письмо успешно отправлено!'
        console.log('Письмо успешно отправлено!')
        this.form.enable()
      },
      error => {
        console.log('ERRRRROR!')
        console.log(this.report)
        this.form.enable()
      }
    )
  }

}
