import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICoworking, Message, Review, User } from "../interfaces/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  constructor(private http: HttpClient) {

  }

  getUserIdByToken(token: string): Observable<User> {
    return this.http.post<User>('api/user', { token }) // Путь бека
  }

  create(user_id: any, place_id: number, rating: number, description: string, date: string): Observable<Review> {
    const fd = new FormData()
    fd.append('user_id', user_id)
    fd.append('place_id', place_id.toString())
    fd.append('Rate', rating.toString())
    fd.append('Body', description)
    fd.append('created_at', date)

    return this.http.post<Review>('api/review', fd) // Путь бека
  }
}
