import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ad-business',
  templateUrl: './ad-business.component.html',
  styleUrls: ['./ad-business.component.css']
})
export class AdBusinessComponent implements OnInit {
  form: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
  })

}
}
