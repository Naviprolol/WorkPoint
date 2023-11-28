import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoworking } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/servises/admin.service';
import { CoworkingsService } from 'src/app/servises/coworkings.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  coworking: ICoworking
  tags: string[] = []
  currentPhoto: string
  currentIndex: number = 0;
  showPopup: boolean = false

  constructor(
    private route: ActivatedRoute,
    private coworkingService: CoworkingsService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap
    const coworkingIdFromRouteINT = Number(routeParams.get('id'));


    this.coworkingService.getCoworkingById(coworkingIdFromRouteINT).subscribe(coworking => {
      this.coworking = coworking
      this.coworking.tags.forEach(tag => {
        this.tags.push(tag.name)
      });
      this.coworking.photo = this.coworking.photo.split('#')
      this.coworking.photo.pop();
      console.log(this.coworking)
      this.currentPhoto = this.coworking.photo[0];
    })
  }

  nextPhoto(): void {
    this.currentIndex = (this.currentIndex + 1) % this.coworking.photo.length;
    this.currentPhoto = this.coworking.photo[this.currentIndex];
  }

  prevPhoto(): void {
    this.currentIndex = (this.currentIndex - 1 + this.coworking.photo.length) % this.coworking.photo.length;
    this.currentPhoto = this.coworking.photo[this.currentIndex];
  }

  showPopupAndRedirect() {
    this.showPopup = true;
    setTimeout(() => {
      this.closePopup();
      this.router.navigate(['/admin/requests-to-add'])
    }, 2000);
  }

  closePopup() {
    this.showPopup = false;
  }

  onSubmitApproved() {
    this.adminService.changePlaceStatus(this.coworking.id, 'Одобрено').subscribe(() => {
      console.log('Место одобрено!')
    })
    // this.userService.editRole(2).subscribe(
    //   user => {
    //     setTimeout(() => {
    //       this.user.role_id = user.role_id
    //     }, 2000)
    //     this.successText = 'Вы успешно перешли на бизнес-аккаунт!'
    //     // console.log('Изменения сохранены')
    //   },
    //   error => {
    //     console.log('ERRRRROR!')
    //     console.log(this.user)
    //     this.form.enable()
    //   }
    // )
  }

}
