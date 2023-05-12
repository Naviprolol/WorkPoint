import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Output() a: any = false

  // filterValue = { category1: false, category2: false, category3: false, category4: false, category5: false, category6: false, category7: false, category8: false }

  // @Output() filterChange = new EventEmitter();

  // onChange() {
  //   this.filterChange.emit(this.filterValue)
  // }
}
