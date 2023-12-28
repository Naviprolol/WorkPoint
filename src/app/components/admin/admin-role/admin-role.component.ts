import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

}
