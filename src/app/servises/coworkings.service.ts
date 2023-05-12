import { HttpClient } from "@angular/common/http";
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
    return this.http.get<ICoworking[]>('/api/coworkings')
  }

  getById(id: string): Observable<ICoworking> {
    return this.http.get<ICoworking>(`/api/coworkings/${id}`)
  }

  create(name: string, city: string, district: string, address: string, description: string, workHours: string,
    type: string, price: string, tags: string[], parking: boolean, restzone: boolean, conference: boolean, phone?: string,
    email?: string, site?: string, photo?: File): Observable<ICoworking> {  // parking: boolean, restzone: boolean, conference: boolean, tags: string[],
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
    fd.append('parking', JSON.stringify(parking))
    fd.append('recreation_area', JSON.stringify(restzone))
    fd.append('conference_hall', JSON.stringify(conference))
    if (phone) {
      fd.append('company_phone', phone)
    }
    if (email) {
      fd.append('email', email)
    }
    if (site) {
      fd.append('site', site)
    }

    return this.http.post<ICoworking>('/api/category', fd)
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

  delete(id: string): Observable<Message> { // Вместо Message — то , что возвращается в методе бекенда
    return this.http.delete<Message>(`/api/category/${id}`)
  }

}
