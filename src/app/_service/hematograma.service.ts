import { HttpClient } from '@angular/common/http';
import { Hematograma } from './../_model/hematograma';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class HematogramaService {
  hematogramaCambio= new Subject<Hematograma[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/hematograma`;

  constructor(private http:HttpClient) { }

  listarHematograma(){
    return this.http.get<Hematograma[]>(this.url);
  }

  listarHematogramaId(id: number){
    return this.http.get<Hematograma>(`${this.url}/${id}`) 
  }

  registrarHematograma(hematograma: Hematograma){
    return this.http.post(this.url, hematograma);
  }

  modificarHematograma(hematograma: Hematograma){
    return this.http.put(this.url, hematograma);
  }
}