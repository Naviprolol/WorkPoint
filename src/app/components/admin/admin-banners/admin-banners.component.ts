import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IAd, ICoworking } from 'src/app/interfaces/interfaces';
import { AdService } from 'src/app/servises/ad.service';
import { AdminService } from 'src/app/servises/admin.service';
import { CoworkingsService } from 'src/app/servises/coworkings.service';

@Component({
  selector: 'app-admin-banners',
  templateUrl: './admin-banners.component.html',
  styleUrls: ['./admin-banners.component.css']
})
export class AdminBannersComponent implements OnInit {
  dropdownOpenDate: boolean = false;
  ads: IAd[] = []
  filteredAds: IAd[] = []
  coworkings: ICoworking[] = []

  selectedDate: string = 'Сначала новые'
  dates: string[] = ['Сначала новые', 'Сначала старые']

  constructor(
    private adminService: AdminService,
    private adService: AdService,
    private coworkingsService: CoworkingsService
  ) { }

  ngOnInit(): void {
    this.adService.getAllAds().subscribe((ads) => {
      ads = ads.filter(ad => ad.status === 'Одобрено');
      this.ads = ads;
      this.coworkingsService.getAll().subscribe((coworkings) => {
        this.coworkings = coworkings;
        this.filterAdsByPlaceId();
        this.filteredAds = this.ads
        this.sortNewToOld()
        this.filteredAds.sort()
      });
    })
  }

  filterAdsByPlaceId(): void {
    if (this.ads && this.coworkings) {
      this.ads = this.ads.filter(ad => {
        return this.coworkings.some(coworking => coworking.id === ad.id_place);
      });
    }
  }

  isPastPromo(dateTo: string): boolean {
    const currentDate = new Date();
    const endDate = new Date(dateTo);
    return currentDate > endDate;
  }

  toggleDropdownDate(): void {
    this.dropdownOpenDate = !this.dropdownOpenDate;
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
    const activeAds = this.filteredAds.filter(ad => !this.isPastPromo(ad.date_to));
    const pastAds = this.filteredAds.filter(ad => this.isPastPromo(ad.date_to));

    activeAds.sort((a, b) => moment(a.date_to).diff(moment(b.date_to)));
    pastAds.sort((a, b) => moment(a.date_to).diff(moment(b.date_to)));

    this.filteredAds = [...activeAds, ...pastAds];
  }

  sortNewToOld(): void {
    const activeAds = this.filteredAds.filter(ad => !this.isPastPromo(ad.date_to));
    const pastAds = this.filteredAds.filter(ad => this.isPastPromo(ad.date_to));

    activeAds.sort((a, b) => moment(b.date_to).diff(moment(a.date_to)));
    pastAds.sort((a, b) => moment(b.date_to).diff(moment(a.date_to)));

    this.filteredAds = [...activeAds, ...pastAds];
  }

}
