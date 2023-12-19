import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAd, ICoworking } from 'src/app/interfaces/interfaces';
import { AdService } from 'src/app/servises/ad.service';
import { CoworkingsService } from 'src/app/servises/coworkings.service';
import { isActivePromo } from 'src/app/shared/functions';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
  searchText: string = ''
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totelCoworkings: number;

  parking: boolean = false
  recreation_area: boolean = false
  conference_hall: boolean = false
  isLoading: boolean = false;

  coworkings: ICoworking[] = []
  filteredCoworkings: ICoworking[] = []

  activeDistricts: string[] = []
  activeTypes: string[] = []
  activeOpeningHours: string[] = []

  index: number = 0;

  ads: IAd[] = [];

  readonly items: { photo: string, id_place: number }[] = [
    { photo: 'assets/img/banner.svg', id_place: -1 },
  ];

  constructor(
    private coworkingsService: CoworkingsService,
    private elementRef: ElementRef,
    private adService: AdService,
    private router: Router) { }

  ngOnInit(): void {
    this.coworkingsService.getAll().subscribe(coworkings => {
      console.log(coworkings)
      coworkings.forEach(coworking => {
        if (coworking.status === 'Одобрено') { // coworking.status !== 'Отказано' && coworking.status !== 'На проверке'
          this.coworkings.push(coworking)
        }
      });
      this.totelCoworkings = coworkings.length
      this.updateFilteredCoworkings();
    });
    this.adService.getAllAds().subscribe((ads) => {
      this.ads = ads
      console.log(this.ads)
      this.ads.forEach(ad => {
        if (ad.status === 'Одобрено' && isActivePromo(ad.date_from, ad.date_to)) {
          this.items.push({
            photo: ad.photo,
            id_place: ad.id_place
          });
        }
      });
    })
  }

  onBannerClick(id_place: number) {
    if (id_place === -1) {
      return;
    }
    this.router.navigate(['/main', id_place]);
  }

  scrollToElement(element: string): void {
    const searchElement = this.elementRef.nativeElement.querySelector(element);
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  filterByText() {
    this.isLoading = true;

    this.updateFilteredCoworkings();

    const loadingData = new Observable<void>(observer => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 200);
    });

    loadingData.subscribe(() => {
      this.isLoading = false; // Загрузка данных завершена, установка isLoading в false
    });
  }

  onClickDistrictFilter(district: string): void {
    if (this.activeDistricts.includes(district)) {
      this.activeDistricts = this.activeDistricts.filter(d => d !== district);
    } else {
      this.activeDistricts.push(district);
    }
    this.updateFilteredCoworkings();
  }

  onClickTypeFilter(type: string): void {
    if (this.activeTypes.includes(type)) {
      this.activeTypes = this.activeTypes.filter(t => t !== type);
    } else {
      this.activeTypes.push(type);
    }
    this.updateFilteredCoworkings();
  }

  onClickOpeningHoursFilter(opening_hours: string): void {
    if (this.activeOpeningHours.includes(opening_hours)) {
      this.activeOpeningHours = this.activeOpeningHours.filter(h => h !== opening_hours);
    } else {
      this.activeOpeningHours.push(opening_hours);
    }
    this.updateFilteredCoworkings();
  }

  onClickParkingFilter(): void {
    this.parking = !this.parking;
    this.updateFilteredCoworkings();
  }

  onClickConferenceHallFilter(): void {
    this.conference_hall = !this.conference_hall;
    this.updateFilteredCoworkings();
  }

  onClickRecreationAreaFilter(): void {
    this.recreation_area = !this.recreation_area;
    this.updateFilteredCoworkings();
  }

  private updateFilteredCoworkings(): void {
    if (this.activeDistricts.length === 0 && this.activeTypes.length === 0 && this.activeOpeningHours.length === 0 &&
      !this.parking && !this.conference_hall && !this.recreation_area && this.searchText.length === 0) {
      this.filteredCoworkings = [...this.coworkings];
    } else {
      this.filteredCoworkings = this.coworkings.filter(coworking =>
        this.isActiveDistrict(coworking.district) && this.isActiveType(coworking.type_cafe) && this.isActiveOpeningHours(coworking.opening_hours) &&
        this.isActiveParking(coworking.parking) &&
        this.isActiveConferenceHall(coworking.conference_hall) &&
        this.isActiveRecreationArea(coworking.recreation_area) &&
        coworking.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  private isActiveDistrict(district: string): boolean {
    return this.activeDistricts.length === 0 || this.activeDistricts.includes(district);
  }

  private isActiveType(type: string): boolean {
    return this.activeTypes.length === 0 || this.activeTypes.includes(type);
  }

  private isActiveOpeningHours(opening_hours: string): boolean {
    return this.activeOpeningHours.length === 0 || this.activeOpeningHours.includes(opening_hours)
  }

  private isActiveParking(parking: boolean): boolean {
    return !this.parking || parking;
  }

  private isActiveConferenceHall(conferenceHall: boolean): boolean {
    return !this.conference_hall || conferenceHall;
  }

  private isActiveRecreationArea(recreationArea: boolean): boolean {
    return !this.recreation_area || recreationArea;
  }
}
