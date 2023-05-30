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
    type: string, price: string, tags: string[], parking: boolean, restzone: boolean, conference: boolean, photo: File, phone?: string,
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
      photo: photo.name,
    };

    let formData1 = new FormData();
    formData1.append('payload', JSON.stringify(data))
    formData1.append('files', photo)
    // console.log(formData1.get('files'))

    return this.http.post<ICoworking>('https://1506815-cq40245.tw1.ru/places/upload_place', formData1, { headers })
  }

  update(id: number, user_id: number, name: string, city: string, district: string, address: string, description: string, workHours: string,
    type: string, price: string, parking: boolean, restzone: boolean, conference: boolean, photo: File, phone?: string,
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
      photo: photo.name,
      id: id
    };

    return this.http.post<ICoworking>(`https://1506815-cq40245.tw1.ru/places/update`, data, { headers: headers })
  }

  delete(id: number): Observable<any> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.delete<any>(`https://1506815-cq40245.tw1.ru/places/delete?id_place=${id}`, { headers: headers })
  }

}
