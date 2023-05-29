import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Output() searchClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() coworkingsClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() topClicked: EventEmitter<void> = new EventEmitter<void>();

  onSearchClick() {
    this.searchClicked.emit();
  }

  onCoworkingsClick() {
    this.coworkingsClicked.emit();
  }

  onTopClick() {
    this.topClicked.emit();
  }
}
