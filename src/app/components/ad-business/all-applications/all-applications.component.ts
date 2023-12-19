import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AdService } from 'src/app/servises/ad.service';
import { isActivePromo } from 'src/app/shared/functions';

@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.css']
})
export class AllApplicationsComponent implements OnInit {
  applications: any = []
  filteredApplications: any = []

  selectedDate: string = 'Сначала новые';
  dates: string[] = ['Сначала новые', 'Сначала старые'];
  dropdownOpenDate: boolean = false;

  selectedStatus: string = 'Все';
  dropdownOpenStatus: boolean = false;
  statuses: string[] = ['Все', 'На проверке', 'Сейчас идет', 'Будет идти', 'Промо-акция закончилась'];
  statusesMap: { [key: string]: string } = {
    'Все': 'Все',
    'На проверке': 'На проверке',
    'Сейчас идет': 'Сейчас идет',
    'Будет идти': 'Будет идти',
    'Промо-акция закончилась': 'Промо-акция закончилась'
  };


  constructor(
    private adService: AdService
  ) { }

  ngOnInit(): void {
    this.adService.getAllAds().subscribe((ads) => {
      this.applications = ads;
      this.filteredApplications = this.applications
      this.sortNewToOld();
      console.log(this.applications);
    })
  }

  toggleDate(date: string): void {
    this.selectedDate = date;
    if (date === 'Сначала новые') {
      this.sortNewToOld();
    } else if (date === 'Сначала старые') {
      this.sortOldToNew();
    }
  }

  sortOldToNew(): void {
    this.filteredApplications.sort((applicationFirst: any, applicationSecond: any) =>
      moment(applicationFirst.date_from, 'YYYY-MM-DD').diff(moment(applicationSecond.date_from, 'YYYY-MM-DD'), 'days')
    );
  }

  sortNewToOld(): void {
    this.filteredApplications.sort((applicationFirst: any, applicationSecond: any) =>
      moment(applicationSecond.date_from, 'YYYY-MM-DD').diff(moment(applicationFirst.date_from, 'YYYY-MM-DD'), 'days')
    );
  }

  toggleDropdownDate(): void {
    this.dropdownOpenDate = !this.dropdownOpenDate;
  }

  toggleDropdownStatus(): void {
    this.dropdownOpenStatus = !this.dropdownOpenStatus;
  }

  toggleStatus(status: string): void {
    this.selectedStatus = status;
    this.filterApplications();
  }

  filterApplications(): void {
    this.filteredApplications = this.applications.filter((application: any) => (
      this.selectedStatus === 'Все' || application.status === this.selectedStatus
    ));
  }

  isActivePromo(dateFrom: string, dateTo: string): boolean {
    return isActivePromo(dateFrom, dateTo);
  }

  isFuturePromo(dateFrom: string): boolean {
    const currentDate = new Date();
    const startDate = new Date(dateFrom);

    return currentDate < startDate;
  }

  isPastPromo(dateTo: string): boolean {
    const currentDate = new Date();
    const endDate = new Date(dateTo);

    return currentDate > endDate;
  }

}
