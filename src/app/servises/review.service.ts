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

  create(user_id: any, place_id: number, rating: number, description: string): Observable<Review> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    const data = {
      user_id: `${user_id}`,
      place_id: `${place_id}`,
      rank: `${rating}`,
      body: `${description}`
    };

    return this.http.post<Review>('https://1506815-cq40245.tw1.ru/review/add_review', data, { headers: headers }) // Путь бека
  }
}
