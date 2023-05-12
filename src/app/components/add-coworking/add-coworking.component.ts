import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { coworkings } from 'src/app/data/coworkings';
import { switchMap } from 'rxjs/operators';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { ICoworking } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-add-coworking',
  templateUrl: './add-coworking.component.html',
  styleUrls: ['./add-coworking.component.css']
})
export class AddCoworkingComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef
  isNew = true
  ifClicked = false
  form: FormGroup
  image: File
  imagePreview: any = ''
  coworking: ICoworking
  selectedTags: string[] = [];
  tags = ['Кафе', 'Wi-Fi', 'Зона отдыха', 'Розетки'];

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
      workHours: new FormControl(''),
      type: new FormControl(''),
      price: new FormControl(''),
      tags: new FormControl(''),
      parking: new FormControl(false),
      restzone: new FormControl(false),
      conference: new FormControl(false),
      phone: new FormControl(null),
      email: new FormControl(null),
      site: new FormControl(null),
      photo: new FormControl(null)
    })

    // this.form.disable()

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false
          // return this.coworkingsService.getById(params['id'])
          return coworkings
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
            workHours: coworking.workHours,
            type: coworking.type_cafe,
            price: coworking.cost,
            parking: coworking.parking,
            restzone: coworking.recreation_area,
            conference: coworking.conference_hall,
            phone: coworking.company_phone,
            email: coworking.email,
            site: coworking.site,
            tags: coworking.tags
          })
          // for (let index = 0; index < coworking.photo.length; index++) {
          //   console.log(coworking.photo.length)
          //   this.imagePreview.append(coworking.photo[index])
          //   console.log(this.imagePreview)
          // }
          this.imagePreview = coworking.photo[0]
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

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0] // 0 — если передаем один елемент
    this.image = file

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()

    if (this.isNew) {
      // create
      obs$ = this.coworkingsService.create(this.form.value.name, this.form.value.city, this.form.value.district,
        this.form.value.address, this.form.value.description, this.form.value.workHours,
        this.form.value.type, this.form.value.price, this.form.value.tags, this.form.value.parking, this.form.value.restzone, this.form.value.conference, this.form.value.phone,
        this.form.value.email, this.form.value.site, this.image) // разобраться как и дописать conference и тд
    }
    else {
      // update
      obs$ = this.coworkingsService.update(this.coworking.id, this.form.value.name, this.form.value.city, this.form.value.district,
        this.form.value.address, this.form.value.description, this.form.value.workHours,
        this.form.value.type, this.form.value.price, this.form.value.tags, this.form.value.parking, this.form.value.restzone, this.form.value.conference, this.form.value.phone,
        this.form.value.email, this.form.value.site, this.image) // дописать conference и тд
    }

    obs$.subscribe(
      coworking => {
        this.coworking = coworking
        console.log('Изменения сохранены')
        this.form.enable()
      },
      error => {
        console.log('ERRRRROR!')
        this.form.enable()
      }
    )
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить коворкинг ${this.coworking.name}?`)

    if (decision) {
      this.coworkingsService.delete(this.coworking.id).subscribe(
        response => console.log('Успешно удалилось'),
        error => console.log('Ошибка удаления коворкинга'),
        () => this.router.navigate(['/main'])
      )
    }
  }

  returnToMain() {
    this.router.navigate(['/main'])
  }

}
