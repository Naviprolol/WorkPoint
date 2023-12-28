import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ICoworking } from 'src/app/interfaces/interfaces';
import { CoworkingsService } from 'src/app/servises/coworkings.service';

@Component({
  selector: 'app-requests-to-add',
  templateUrl: './requests-to-add.component.html',
  styleUrls: ['./requests-to-add.component.css']
})

export class RequestsToAddComponent implements OnInit {

  dropdownOpenStatus: boolean = false;
  dropdownOpenDate: boolean = false;
  selectedRole: string = 'Все';
  coworkings: ICoworking[] = [];
  filteredCoworkings: ICoworking[] = [];
  roles: string[] = ['Все', 'Одобрено', 'Отказано'];
  rolesMap: { [key: string]: string } = {
    'Все': 'Все',
    'Одобрено': 'Одобренные',
    'Отказано': 'Отклоненные',
    // Другие значения статусов, если есть
  };

  selectedDate: string = 'Сначала новые'
  dates: string[] = ['Сначала новые', 'Сначала старые']

  constructor(
    private coworkingsService: CoworkingsService
  ) { }

  ngOnInit(): void {
    this.coworkingsService.getAll().subscribe(coworkings => {
      this.coworkings = coworkings
      // this.coworkings.forEach(coworking => {
      //   coworking.created_at = moment(coworking.created_at).format('DD.MM.YYYY');
      // });
      console.log(this.coworkings)
      this.filteredCoworkings = this.coworkings
      this.sortNewToOld();
    });
  }

  toggleDropdownStatus(): void {
    this.dropdownOpenStatus = !this.dropdownOpenStatus;
  }

  toggleDropdownDate(): void {
    this.dropdownOpenDate = !this.dropdownOpenDate;
  }

  toggleRole(role: string): void {
    this.selectedRole = role;
    this.filterCoworkings();
  }

  toggleDate(date: string): void {
    this.selectedDate = date;
    if (date === 'Сначала новые') {
      this.sortNewToOld();
    } else if (date === 'Сначала старые') {
      this.sortOldToNew();
    }
  }

  filterCoworkings(): void {
    this.filteredCoworkings = this.coworkings.filter(coworking => (
      this.selectedRole === 'Все' || coworking.status === this.selectedRole
    ));
  }

  sortOldToNew(): void {
    this.filteredCoworkings.sort((coworkingFirst: ICoworking, coworkingSecond: ICoworking) => moment(coworkingFirst.id).diff(moment(coworkingSecond.id)));
  }

  sortNewToOld(): void {
    this.filteredCoworkings.sort((coworkingFirst: ICoworking, coworkingSecond: ICoworking) => moment(coworkingSecond.id).diff(moment(coworkingFirst.id)));
  }

}
