import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICoworking, User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/servises/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { switchMap } from 'rxjs/operators';
import { AdService } from 'src/app/servises/ad.service';
@Component({
  selector: 'app-ad-business',
  templateUrl: './ad-business.component.html',
  styleUrls: ['./ad-business.component.css']
})
export class AdBusinessComponent implements OnInit {
  form: FormGroup;
  coworking: ICoworking;
  report: any;
  accessText: string = 'Все поля должны быть заполнены';
  user: User;
  showPopup: boolean = false;
  isNew: boolean = true;
  isFileUploaded: boolean = false;
  banner: File;
  @ViewChild('banner') inputRef: ElementRef;
  date_to: string;

  constructor(
    private userService: UserService,
    private adService: AdService,
    private coworkingService: CoworkingsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      date_from: new FormControl(null, [Validators.required]),
    })

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.coworkingService.getCoworkingById(params['id'])
      })
    ).subscribe(coworking => {
      if (coworking) {
        this.coworking = coworking
        this.form.patchValue({
          name: coworking.name,
          city: coworking.city,
          address: coworking.address,
          email: coworking.email
        })
      }
    },
      error => { console.log('Ошибка!') }
    )

    this.userService.getUserByToken().subscribe(user => {
      this.user = user
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

    this.isFileUploaded = true;
  }

  onSubmit() {
    let obs$
    this.form.disable()

    obs$ = this.adService.uploadAd(this.form.value.name, this.form.value.city, this.form.value.address, this.form.value.price, this.form.value.email,
      this.form.value.date_from, this.date_to, this.banner)

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

  onStartDateChange() {
    const startDate = this.form.get('date_from')?.value;
    const price = this.form.get('price')?.value;

    if (startDate && price) {
      const endDate = new Date(startDate);
      if (price === 'На 1 день') {
        endDate.setDate(endDate.getDate() + 1); // Добавляем 1 день
      } else if (price === 'На 7 дней') {
        endDate.setDate(endDate.getDate() + 7); // Добавляем 7 дней
      }

      this.date_to = this.formatDate(endDate.toISOString());
    }
  }

  formatDate(dateString: string): string {
    const [datePart,] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    return `${year}-${month}-${day}`;
  }

}
