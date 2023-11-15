import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ad, User } from "../interfaces/interfaces";


@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  getUserByToken(): Observable<User> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Accept', 'application/json')

    // console.log(headers.get('Authorization'))

    return this.http.get<User>('https://www.1506815-cq40245.tw1.ru/user/current', { headers: headers }) // https://1506815-cq40245.tw1.ru/user/current
  }

  updateUser(user_id: number, name: string, surname: string, city: string, phone: string,): Observable<User> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    const data = {
      id: user_id,
      name: name,
      surname: surname,
      phone: phone,
      city: city
    }

    return this.http.post<User>('https://www.1506815-cq40245.tw1.ru/user/settings', data, { headers: headers }) // https://1506815-cq40245.tw1.ru/user/settings
  }

  uploadAd(name: string, city: string, address: string, price: string, email: string, photo: File): Observable<Ad> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    const status = "На проверке";

    const data = {
      name: name,
      city: city,
      address: address,
      tariff: price,
      email: email,
    };

    let formData = new FormData();
    formData.append('payload', JSON.stringify(data))
    formData.append('file', photo)

    console.log(formData.get('file'))
    console.log(formData.get('payload'))

    return this.http.post<Ad>('https://www.1506815-cq40245.tw1.ru/ad/upload_ad', formData, { headers }) // https://www.1506815-cq40245.tw1.ru/report/dashboard
  }

  editRole(role_id: number): Observable<User> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    params = params.set('role_id', role_id);

    const options = { params, headers };

    return this.http.post<User>('https://www.1506815-cq40245.tw1.ru/user/role', null, options) // https://1506815-cq40245.tw1.ru/user/role
  }

  uploadAvatar(photo: File): Observable<User> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    let formData = new FormData();
    formData.append('file', photo)

    return this.http.post<User>('https://www.1506815-cq40245.tw1.ru/user/photo', formData, { headers: headers }) // https://1506815-cq40245.tw1.ru/user/photo
  }

  addFavoritePlace(place_id: number, user_id: number): Observable<User> {
    const data = {
      place_id,
      user_id
    }
    return this.http.post<User>('https://www.1506815-cq40245.tw1.ru/user/favorite_place', data)
  }

  getFavoritePlaces(): Observable<User> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<User>('https://www.1506815-cq40245.tw1.ru/user/my_favorite_places', { headers })
  }

  deleteFavoritePlace(id_fav_place: number): Observable<User> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.delete<User>(`https://www.1506815-cq40245.tw1.ru/user/delete_favorite_place?id_fav_place=${id_fav_place}`, { headers })
  }
}
