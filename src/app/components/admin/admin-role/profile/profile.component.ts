import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/servises/admin.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User
  showPopup: boolean = false
  flag: boolean;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      const routeParams = this.route.snapshot.paramMap
      const coworkingIdFromRouteINT = Number(routeParams.get('id'));
      this.user = users.find(user => user.id === coworkingIdFromRouteINT)!;
      if (this.user.city === null) {
        this.user.city = 'Не указан'
      }
    })
  }

  changeStatus(): void {
    if (this.user.role_id !== 3) {
      this.flag = true;
      this.adminService.changeUserRole(this.user.id, 3).subscribe(() => {
        console.log('Role changed to ADMIN')
      },
        error => { console.log('Ошибка смены роли на админа') }
      )
    }
    else {
      this.adminService.changeUserRole(this.user.id, 1).subscribe(() => {
        this.flag = false;
        console.log('Role changed to DEFAULT')
      },
        error => { console.log('Ошибка смены роли на обычную') }
      )
    }
  }

  showPopupAndRedirect(): void {
    this.showPopup = true;
    setTimeout(() => {
      this.closePopup();
      this.router.navigate(['/admin/roles'])
    }, 2000);
  }

  closePopup(): void {
    this.showPopup = false;
  }

}
