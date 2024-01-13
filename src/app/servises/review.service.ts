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
      user_id,
      place_id,
      rank: rating,
      body: description
    };

    return this.http.post<Review>('https://www.1506815-cq40245.tw1.ru/review/add_review', data, { headers: headers }) // https://1506815-cq40245.tw1.ru/review/add_review
  }

  getReviewsByIdPlace(place_id: number): Observable<Review[]> {
    return this.http.post<Review[]>(`https://www.1506815-cq40245.tw1.ru/places/get_reviews?id_place=${place_id}`, {}) // https://1506815-cq40245.tw1.ru/places/get_reviews?id_place=${place_id}
  }

  addReviewAnswer(user_id: number, review_id: number, user_name: string, user_surname: string, user_photo: string, place_id: number, body: string): Observable<Review> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    const data = {
      user_id,
      review_id,
      user_name,
      user_surname,
      user_photo,
      place_id,
      body
    };

    return this.http.post<Review>('https://www.1506815-cq40245.tw1.ru/review/add_review_answer', data, { headers: headers });
  }
}
