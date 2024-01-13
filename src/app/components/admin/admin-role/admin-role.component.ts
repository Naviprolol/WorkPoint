import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/servises/admin.service';
import { UserService } from 'src/app/servises/user.service';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {
  users: User[]
  filteredUsers: User[]
  searchText: string = ''
  isLoading: boolean = false;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      this.users = users
      this.filteredUsers = users
      this.sortByRole();
    })
  }

  filterByText() {
    this.isLoading = true;
    const searchTextLower = this.searchText.toLowerCase();

    if (this.searchText.length === 0) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user => {
        const fullName = (user.name + ' ' + user.surname).toLowerCase();
        const reverseFullName = (user.surname + ' ' + user.name).toLowerCase();

        return fullName.includes(searchTextLower) || reverseFullName.includes(searchTextLower);
      });
    }

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

  sortByRole() {
    this.filteredUsers = this.filteredUsers.sort((first: User, second: User) => {
      if (first.role_id === 3 && second.role_id !== 3) {
        return -1; // Пользователь first - админ, он должен идти раньше
      } else if (first.role_id !== 3 && second.role_id === 3) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
