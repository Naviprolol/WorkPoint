import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICoworking, Message, Review, User } from "../interfaces/interfaces";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  constructor(private http: HttpClient) {

  }

  getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=')
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
  }



  getUserByToken(): Observable<any> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Accept', 'application/json')

    console.log(headers.get('Authorization'))

    return this.http.get<any>('http://81.200.145.113:8001/user/current', { headers: headers }) // Путь бека
  }

  getPlacesByToken(): Observable<ICoworking[]> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<ICoworking[]>('http://81.200.145.113:8001/user/', { headers: headers })
  }

  create(user_id: any, place_id: number, rating: number, description: string): Observable<Review> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    const data = {
      user_id: `${user_id}`,
      place_id: `${place_id}`,
      rank: `${rating}`,
      body: `${description}`
    };

    return this.http.post<Review>('http://81.200.145.113:8001/review/add_review', data, { headers: headers }) // Путь бека
  }
}
