import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAd } from 'src/app/interfaces/interfaces';
import { AdService } from 'src/app/servises/ad.service';
import { AdminService } from 'src/app/servises/admin.service';

@Component({
  selector: 'app-app-request',
  templateUrl: './app-request.component.html',
  styleUrls: ['./app-request.component.css']
})
export class AppRequestComponent {
  ad: IAd;
  showPopup: boolean = false
  flag: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adService: AdService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    const adIdFromRouteINT = Number(routeParams.get('id'));

    this.adService.getAllAds().subscribe((ads) => {
      this.ad = ads.find(ad => ad.id === adIdFromRouteINT)!
      console.log(this.ad)
    })
  }

  showPopupAndRedirect() {
    this.showPopup = true;
    setTimeout(() => {
      this.closePopup();
      this.router.navigate(['/admin/requests-to-app'])
    }, 2000);
  }

  closePopup() {
    this.showPopup = false;
  }

  onSubmitApproved() {
    this.flag = true;
    this.adminService.changeAdStatus(this.ad.id, 'Одобрено').subscribe(() => {
      console.log('Место одобрено!')
    })
  }

  onSubmitDenied() {
    this.flag = false;
    this.adminService.changeAdStatus(this.ad.id, 'Отказано').subscribe(() => {
      console.log('Отказано')
    })
  }
}
