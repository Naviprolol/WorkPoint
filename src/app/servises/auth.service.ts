import { Injectable } from "@angular/core";
import { User } from "../interfaces/interfaces";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | any = null

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string): Observable<{ access_token: string }> {

    const fd = new FormData()
    fd.append('username', username)
    fd.append('password', password)

    return this.http.post<{ access_token: string }>('http://81.200.145.113:8001/user/login/', fd).pipe(
      tap(
        (token) => {
          localStorage.setItem('auth-token', token.access_token)
          this.setToken(token.access_token)
          // console.log(token.access_token)
        }
      )
    )
  }

  setToken(token: string | null) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://81.200.145.113:8001/user/signup/', user)
  }
}
