import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICoworking, Message } from "../interfaces/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CoworkingsService {
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<ICoworking[]> {
    return this.http.get<ICoworking[]>('https://1506815-cq40245.tw1.ru/places/all')
  }

  getCoworkingById(id: string): Observable<ICoworking> {
    let params = new HttpParams().set('id_place', id)
    return this.http.post<ICoworking>(`https://1506815-cq40245.tw1.ru/places/get_place`, {}, { params })
  }

  getCoworkingsByToken(): Observable<ICoworking[]> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<ICoworking[]>('https://1506815-cq40245.tw1.ru/user/', { headers: headers })
  }

  create(user_id: number, name: string, city: string, district: string, address: string, description: string, workHours: string,
    type: string, price: string, tags: string[], parking: boolean, restzone: boolean, conference: boolean,
    photo1: File, photo2: File, photo3: File, phone?: string,
    email?: string, site?: string): Observable<ICoworking> {

    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    let tagsIDS: string[] = []
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === 'Розетки') {
        tagsIDS.push('1')
      }
      else if (tags[i] === 'Еда') {
        tagsIDS.push('3')
      }
      else if (tags[i] === 'Напитки') {
        tagsIDS.push('4')
      }
      else if (tags[i] === 'Wi-Fi') {
        tagsIDS.push('5')
      }
      else if (tags[i] === 'Канцелярия') {
        tagsIDS.push('6')
      }
    }

    const data = {
      user_id: user_id,
      name: name,
      city: city,
      district: district,
      address: address,
      description: description,
      opening_hours: workHours,
      type_cafe: type,
      cost: price,
      tags: tagsIDS,
      rating: '0',
      parking: parking,
      recreation_area: restzone,
      conference_hall: conference,
      company_phone: phone,
      email: email,
      site: site,
      photo: '',
    };

    let formData = new FormData();
    formData.append('payload', JSON.stringify(data))
    formData.append('files', photo1)

    if (photo2 != null) {
      formData.append('files', photo2)
    }

    if (photo3 != null) {
      formData.append('files', photo3)
    }
    console.log(formData.get('files'))

    return this.http.post<ICoworking>('https://1506815-cq40245.tw1.ru/places/upload_place', formData, { headers })
  }

  update(id: number, user_id: number, name: string, city: string, district: string, address: string, description: string, workHours: string,
    type: string, price: string, parking: boolean, restzone: boolean, conference: boolean, phone?: string,
    email?: string, site?: string): Observable<ICoworking> {

    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    const data = {
      user_id: user_id,
      name: name,
      city: city,
      district: district,
      address: address,
      description: description,
      opening_hours: workHours,
      type_cafe: type,
      cost: price,
      rating: '0',
      parking: parking,
      recreation_area: restzone,
      conference_hall: conference,
      company_phone: phone,
      email: email,
      site: site,
      photo: '',
      id: id
    };

    return this.http.post<ICoworking>(`https://1506815-cq40245.tw1.ru/places/update`, data, { headers: headers })
  }

  updatePhoto(id_place: number, photo1?: File, photo2?: File, photo3?: File): Observable<ICoworking> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    let formData = new FormData();

    if (photo1 != undefined && photo1 != null) {
      formData.append('files', photo1)
    }

    if (photo2 != undefined && photo2 != null) {
      formData.append('files', photo2)
    }

    if (photo3 != undefined && photo3 != null) {
      formData.append('files', photo3)
    }

    console.log(formData.get('files'))

    return this.http.post<ICoworking>(`https://1506815-cq40245.tw1.ru/places/update_photo?id_place=${id_place}`, formData, { headers: headers })
  }

  updateTags(id_place: number, tags: string[]): Observable<ICoworking> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    let tagsIDS: string[] = []
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === 'Розетки') {
        tagsIDS.push('1')
      }
      else if (tags[i] === 'Еда') {
        tagsIDS.push('3')
      }
      else if (tags[i] === 'Напитки') {
        tagsIDS.push('4')
      }
      else if (tags[i] === 'Wi-Fi') {
        tagsIDS.push('5')
      }
      else if (tags[i] === 'Канцелярия') {
        tagsIDS.push('6')
      }
    }

    const data = {

    }

    return this.http.post<ICoworking>(`https://1506815-cq40245.tw1.ru/places/update_tags?id_place=${id_place}`, data, { headers: headers })
  }

  delete(id: number): Observable<any> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.delete<any>(`https://1506815-cq40245.tw1.ru/places/delete?id_place=${id}`, { headers: headers })
  }

}
