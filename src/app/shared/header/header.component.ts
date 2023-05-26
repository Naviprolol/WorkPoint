import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/servises/auth.service';
import { ReviewService } from 'src/app/servises/review.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ifClicked = false;
  user: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private reviewService: ReviewService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(user => {
      this.user = user
      console.log('user', this.user.role_id)
    });
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
