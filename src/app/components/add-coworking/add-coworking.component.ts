import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { ICoworking } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-add-coworking',
  templateUrl: './add-coworking.component.html',
  styleUrls: ['./add-coworking.component.css']
})
export class AddCoworkingComponent implements OnInit {
  @ViewChild('input1') inputRef1: ElementRef
  @ViewChild('input2') inputRef2: ElementRef
  @ViewChild('input3') inputRef3: ElementRef

  isNew: boolean = true
  ifClicked: boolean = false
  showPopup: boolean = false
  form: FormGroup
  coworking: ICoworking
  selectedTags: string[] = [];
  tags = ['Розетки', 'Еда', 'Напитки', 'Wi-Fi', 'Канцелярия'];

  image1: File;
  image2: File;
  image3: File;
  imagePreview1: any = '';
  imagePreview2: any = '';
  imagePreview3: any = '';

  flag: boolean = false;

  constructor(private route: ActivatedRoute,
    private coworkingsService: CoworkingsService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      opening_hours: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      tags: new FormControl(''),
      parking: new FormControl(false),
      restzone: new FormControl(false),
      conference: new FormControl(false),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      site: new FormControl(null, [Validators.required]),
      photo: new FormControl(null)
    })

    // this.form.disable()

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false
          return this.coworkingsService.getCoworkingById(params['id'])
        }
        return of(null)
      })
    ).subscribe(
      coworking => {
        if (coworking) {
          this.coworking = coworking
          this.form.patchValue({
            name: coworking.name,
            city: coworking.city,
            district: coworking.district,
            address: coworking.address,
            description: coworking.description,
            photo: coworking.photo,
            opening_hours: coworking.opening_hours,
            type: coworking.type_cafe,
            price: coworking.cost,
            parking: coworking.parking,
            restzone: coworking.recreation_area,
            conference: coworking.conference_hall,
            phone: coworking.company_phone,
            email: coworking.email,
            site: coworking.site,
            tags: coworking.tags,
          })

          // coworking.photo = this.coworking.photo.split('#')
          // this.imagePreview1 = coworking.photo[0]
          // this.imagePreview2 = coworking.photo[1]
          // this.imagePreview3 = coworking.photo[2]
          // console.log(coworking.photo)

          coworking.tags.forEach(tag => {
            this.selectedTags.push(tag.name);
          });
          this.form.get('tags')?.setValue(this.selectedTags);
        }
      },
      error => { console.log('Ошибка') }
    )
  }

  toggleTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(d => d !== tag)
    }
    else {
      this.selectedTags.push(tag);
    }
    this.form.get('tags')?.setValue(this.selectedTags);
  }

  triggerClick(index: number) {
    switch (index) {
      case 1:
        this.inputRef1.nativeElement.click()
        break;
      case 2:
        this.inputRef2.nativeElement.click()
        break;
      case 3:
        this.inputRef3.nativeElement.click()
        break;
      default:
        break;
    }
  }

  onFileUpload(event: any, index: number) {
    const file = event.target.files[0] // 0 — если передаем один елемент

    const reader = new FileReader()
    reader.onload = () => {
      switch (index) {
        case 1:
          this.image1 = file;
          console.log(this.image1)
          this.imagePreview1 = reader.result;
          break;
        case 2:
          this.image2 = file;
          this.imagePreview2 = reader.result;
          break;
        case 3:
          this.image3 = file;
          this.imagePreview3 = reader.result;
          break;
        default:
          break;
      }
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()

    if (this.isNew) {
      console.log(this.coworking)

      // create
      obs$ = this.coworkingsService.create(0, this.form.value.name, this.form.value.city, this.form.value.district,
        this.form.value.address, this.form.value.description, this.form.value.opening_hours,
        this.form.value.type, this.form.value.price, this.form.value.tags, this.form.value.parking, this.form.value.restzone, this.form.value.conference,
        this.image1, this.image2, this.image3, this.form.value.phone, this.form.value.email, this.form.value.site)
    }
    else {
      // update
      obs$ = this.coworkingsService.update(this.coworking.id, 0, this.form.value.name, this.form.value.city, this.form.value.district,
        this.form.value.address, this.form.value.description, this.form.value.opening_hours,
        this.form.value.type, this.form.value.price, this.form.value.parking, this.form.value.restzone, this.form.value.conference, this.form.value.phone,
        this.form.value.email, this.form.value.site)

      this.coworkingsService.updatePhoto(this.coworking.id, this.image1, this.image2, this.image3).subscribe(
        coworking => {
          this.coworking = coworking
          console.log('Фото обновлено')
        },
        error => {
          console.log('Что то пошло не так с обновлением фото')
          console.log(error)
        }
      )
      this.coworkingsService.updateTags(this.coworking.id, this.form.value.tags).subscribe(
        coworking => {
          this.coworking = coworking
          console.log('Теги обновлены')
        },
        error => {
          console.log('Что то пошло не так с обновлением тегов')
          console.log(error)
        }
      )
    }

    obs$.subscribe(
      coworking => {
        this.coworking = coworking
        // console.log('Изменения сохранены')
        this.form.enable()
      },
      error => {
        console.log('ERRRRROR!')
        console.log(error)
        console.log(this.coworking)
        this.form.enable()
      }
    )
  }

  deleteCoworking() {
    const decision = window.confirm(`Вы уверены, что хотите удалить коворкинг ${this.coworking.name}?`)

    if (decision) {
      this.coworkingsService.delete(this.coworking.id).subscribe(
        response => { }, // console.log('Успешно удалилось')
        error => console.log('Ошибка удаления коворкинга'),
        () => this.router.navigate(['/place-settings'])
      )
    }
  }

  returnToMain() {
    this.router.navigate(['/main'])
  }

  changeFlag() {
    this.flag = true;
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
