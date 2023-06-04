import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  successText: string
  userCoworkingsCount: number = 0
  avatar: File
  imagePreview: any = ''
  @ViewChild('avatar') inputRef: ElementRef


  constructor(
    private coworkingsService: CoworkingsService,
    private userService: UserService,) {

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null),
      city: new FormControl(null),
      phone: new FormControl(null),
    })

    this.coworkingsService.getCoworkingsByToken().subscribe((coworkings) => {
      this.userCoworkingsCount = coworkings.length
      console.log(this.userCoworkingsCount)
    })

    this.userService.getUserByToken().subscribe(user => {
      this.user = user
      this.form.patchValue({
        name: user.name,
        surname: user.surname,
        city: user.city,
        phone: user.phone,
      })
    });
  }

  onSubmit() {
    this.form.disable()
    let obs$ = this.userService.updateUser(0, this.form.value.name, this.form.value.surname, this.form.value.city, this.form.value.phone)

    if (this.avatar !== null && this.avatar !== undefined) {
      this.userService.uploadAvatar(this.avatar).subscribe(
        user => {
          this.user = user
          console.log('Аватар обновлен')
        }
      )
    }

    obs$.subscribe(
      () => {
        console.log('Изменения сохранены')
        location.reload()
        this.form.enable()
      },
      error => {
        console.log('ERRRRROR!')
        console.log(this.user)
        this.form.enable()
      }
    )
  }

  onSubmitBusiness() {
    this.userService.editRole(2).subscribe(
      user => {
        this.user.role_id = user.role_id
        this.successText = 'Вы успешно перешли на бизнес-аккаунт!'
        // console.log('Изменения сохранены')
      },
      error => {
        console.log('ERRRRROR!')
        console.log(this.user)
        this.form.enable()
      }
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0] // 0 — если передаем один елемент
    this.avatar = file

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }
}
