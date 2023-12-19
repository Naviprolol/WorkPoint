import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAd, User } from "../interfaces/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdService {
  constructor(private http: HttpClient) {

  }

  uploadAd(name: string, city: string, address: string, price: string, email: string, date_from: string, date_to: string, photo: File): Observable<IAd> {

    const data = {
      user_id: 0,
      name: name,
      city: city,
      address: address,
      tariff: price,
      email: email,
      status: 'На проверке',
      id_place: 0,
      date_to: date_to,
      date_from: date_from,
      photo: ''
    };

    let formData = new FormData();
    formData.append('payload', JSON.stringify(data))
    formData.append('file', photo)

    console.log(formData.get('file'))
    console.log(formData.get('payload'))

    return this.http.post<IAd>('https://www.1506815-cq40245.tw1.ru/ad/upload_ad', formData) // https://www.1506815-cq40245.tw1.ru/report/dashboard
  }

  getAllAds(): Observable<IAd[]> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Accept', 'application/json')

    return this.http.get<IAd[]>('https://www.1506815-cq40245.tw1.ru/user/add', { headers: headers })
  }

  checkCountAds(date_from: string, date_to: string) {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Accept', 'application/json')

    return this.http.post(`https://www.1506815-cq40245.tw1.ru/ad/count_ad?date_to=${date_to}&date_from=${date_from}`, {});
  }
}
