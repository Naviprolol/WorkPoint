import { Component } from '@angular/core';
import * as moment from 'moment';
import { IAd, ICoworking } from 'src/app/interfaces/interfaces';
import { AdService } from 'src/app/servises/ad.service';
import { CoworkingsService } from 'src/app/servises/coworkings.service';

@Component({
  selector: 'app-requests-to-app',
  templateUrl: './requests-to-app.component.html',
  styleUrls: ['./requests-to-app.component.css']
})
export class RequestsToAppComponent {
  dropdownOpenStatus: boolean = false;
  dropdownOpenDate: boolean = false;
  selectedRole: string = 'Все';
  ads: IAd[] = [];
  filteredAds: IAd[] = [];
  roles: string[] = ['Все', 'Одобрено', 'Отказано'];
  rolesMap: { [key: string]: string } = {
    'Все': 'Все',
    'Одобрено': 'Одобренные',
    'Отказано': 'Отклоненные',
  };
  coworkings: ICoworking[] = [];

  selectedDate: string = 'По умолчанию'
  dates: string[] = ['По умолчанию', 'Сначала новые', 'Сначала старые']

  constructor(
    private adService: AdService,
    private coworkingsService: CoworkingsService
  ) { }

  ngOnInit(): void {
    this.adService.getAllAds().subscribe(ads => {
      this.filteredAds = this.ads;
      this.coworkingsService.getAll().subscribe((coworkings) => {
        this.coworkings = coworkings;
        this.filterAdsByPlaceId();
      });
      this.ads = ads;
    });
  }

  filterAdsByPlaceId(): void {
    if (this.ads && this.coworkings) {
      this.filteredAds = this.ads.filter(ad => {
        return this.coworkings.some(coworking => coworking.id === ad.id_place);
      });
    }
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
    if (date === 'Сначала новые' || date === 'По умолчанию') {
      this.sortNewToOld();
    } else if (date === 'Сначала старые') {
      this.sortOldToNew();
    }
  }

  filterByName(): void {
    this.filterCoworkings();
  }

  filterCoworkings(): void {
    this.filteredAds = this.ads.filter(ad => (
      this.selectedRole === 'Все' || ad.status === this.selectedRole
    ));
  }

  sortOldToNew(): void {
    this.filteredAds.sort((adFirst: IAd, adSecond: IAd) => moment(adFirst.id).diff(moment(adSecond.id)));
  }

  sortNewToOld(): void {
    this.filteredAds.sort((adFirst: IAd, adSecond: IAd) => moment(adSecond.id).diff(moment(adFirst.id)));
  }
}
