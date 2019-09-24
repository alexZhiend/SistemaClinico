import { HttpClient } from '@angular/common/http';
import { HematogramaC } from './../_model/hematogramaC';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class HematogramaCService {
  hematogramacCambio= new Subject<HematogramaC[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/hematogramacompleto`;

  constructor(private http:HttpClient) { }

  listarHematogramaC(){
    return this.http.get<HematogramaC[]>(this.url);
  }

  listarHematogramaCId(id: number){
    return this.http.get<HematogramaC>(`${this.url}/${id}`) 
  }

  registrarHematogramaC(hematogramaC: HematogramaC){
    return this.http.post(this.url, hematogramaC);
  }

  modificarHematogramaC(hematogramaC: HematogramaC){
    return this.http.put(this.url, hematogramaC);
  }
}
