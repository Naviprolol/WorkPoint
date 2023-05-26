import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/interfaces";


@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  updateUser(user_id: any, name: string, surname: string, city: string, phone: string,): Observable<User> {

    const fd = new FormData()

    return this.http.post<User>('http://81.200.145.113:8001/user/settings', fd) // Путь бека
  }
}
