import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAd, ICoworking, Message, Review, User } from "../interfaces/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {

  }

  changePlaceStatus(id_place: number, status_place: string): Observable<ICoworking[]> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post<ICoworking[]>(`https://www.1506815-cq40245.tw1.ru/admin/check_place?id_place=${id_place}&status_place=${status_place}`, { headers }) // https://1506815-cq40245.tw1.ru/places/all
  }

  changeAdStatus(id_ad: number, status_place: string): Observable<IAd[]> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post<IAd[]>(`https://www.1506815-cq40245.tw1.ru/admin/check_ad?id_ad=${id_ad}&status_place=${status_place}`, { headers })
  }

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<User[]>(`https://www.1506815-cq40245.tw1.ru/admin/users`, { headers })
  }

  changeUserRole(user_id: number, role_id: number): Observable<User[]> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    console.log(headers)

    return this.http.post<User[]>(`https://www.1506815-cq40245.tw1.ru/admin/role?user_id=${user_id}&role_id=${role_id}`, {}, { headers })
  }

  deleteReview(id_review: number): Observable<Review> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.delete<Review>(`https://www.1506815-cq40245.tw1.ru/admin/delete_review?id_review=${id_review}`, { headers })
  }
}
