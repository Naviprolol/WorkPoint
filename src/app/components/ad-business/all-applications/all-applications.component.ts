import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.css']
})
export class AllApplicationsComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

}
