import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'WorkPoint'
  loading = false

  ngOnInit() {
    this.loading = true

    // Возьмём данные с сервера

    this.loading = false
  }
}
