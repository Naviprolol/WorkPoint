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

  fetch(): Observable<ICoworking[]> {
    return this.http.get<ICoworking[]>('http://81.200.145.113:8001/places/all')
  }

  getById(id: string): Observable<ICoworking> {
    let params = new HttpParams().set('id_place', id)
    return this.http.post<ICoworking>(`http://81.200.145.113:8001/places/get_place`, {}, { params })
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
      else if (tags[i] === 'Зона отдыха') {
        tagsIDS.push('2')
      }
      else if (tags[i] === 'Еда') {
        tagsIDS.push('3')
      }
      else if (tags[i] === 'Напитки') {
        tagsIDS.push('4')
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
    formData1.append('file', photo)
    console.log(photo)

    return this.http.post<ICoworking>('http://81.200.145.113:8001/places/upload_place', formData1, { headers })
  }

  update(id: string, name: string, city: string, district: string, address: string, description: string, workHours: string,
    type: string, price: string, tags: string[], parking: boolean, restzone: boolean, conference: boolean, phone?: string,
    email?: string, site?: string, photo?: File): Observable<ICoworking> { // tags: string[],
    const fd = new FormData()

    if (photo) {
      fd.append('photo', photo, photo.name) // ВМЕСТО 'PHOTO' — ИМЯ КОТОРОЕ В БЭКЕНДЕ
    }
    fd.append('name', name)
    fd.append('city', city)
    fd.append('district', district)
    fd.append('address', address)
    fd.append('description', description)
    fd.append('opening_hours', workHours)
    fd.append('type_cafe', type)
    fd.append('cost', price)
    for (let i = 0; i < tags.length; i++) {
      fd.append('tags', tags[i]);
    }
    fd.append('parking', parking.toString())
    fd.append('recreation_area', restzone.toString())
    fd.append('conference_hall', conference.toString())
    if (phone) {
      fd.append('company_phone', phone)
    }
    if (email) {
      fd.append('email', email)
    }
    if (site) {
      fd.append('site', site)
    }

    return this.http.patch<ICoworking>(`/api/category/${id}`, fd)
  }

  delete(id: string): Observable<any> { // Вместо Message — то , что возвращается в методе бекенда
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.delete<any>(`http://81.200.145.113:8001/places/delete`, { headers: headers })
  }

}
