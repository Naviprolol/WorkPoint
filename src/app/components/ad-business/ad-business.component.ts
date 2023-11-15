import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/servises/user.service';
import { Router } from '@angular/router';
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
  showPopup: boolean = false
  isNew: boolean = true
  banner: File
  @ViewChild('banner') inputRef: ElementRef

  constructor(private userService: UserService, private router: Router) { }

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
      // console.log('user', this.user.role_id)
    });

  }

  onClick() {
    if (this.form.disabled) {
      this.accessText = 'Все поля должны быть заполнены'
    }
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0] // 0 — если передаем один елемент
    this.banner = file

    const reader = new FileReader()
    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()

    obs$ = this.userService.uploadAd(this.form.value.name, this.form.value.city, this.form.value.address, this.form.value.price, this.form.value.email, this.banner)

    obs$.subscribe(
      report => {
        this.report = report
        this.accessText = 'Письмо успешно отправлено!'
        // console.log('Письмо успешно отправлено!')
        this.form.enable()
      },
      error => {
        console.log('ERRRRROR!')
        console.log(this.report)
        this.form.enable()
      }
    )
  }

  showPopupAndRedirect() {
    this.showPopup = true;
    setTimeout(() => {
      this.closePopup();
      this.router.navigate(['/place-settings'])
    }, 2000);
  }

  closePopup() {
    this.showPopup = false;
  }

}
