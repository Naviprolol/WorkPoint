import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servises/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Теперь вы можете зайти в систему используя свои данные
      } else if (params['accessDenied']) {
        // Для начала авторизуйтесь в системе
      }
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value.username, this.form.value.password).subscribe(
      () => this.router.navigate(['/main']), // Навигация на нужную страницу, после успешного входа
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }
}
