import { HttpClient } from '@angular/common/http';
import { Urocultivo } from './../_model/urocultivo';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class UrocultivoService {

  urocultivoCambio= new Subject<Urocultivo[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/urocultivo`;
  
  constructor(private http:HttpClient) { }

  listarUrocultivo(){
    return this.http.get<Urocultivo[]>(this.url);
  }

  listarUrocultivoId(id: number){
    return this.http.get<Urocultivo>(`${this.url}/${id}`); 
  }

  registrarUrocultivo(urocultivo: Urocultivo){
    return this.http.post(this.url, urocultivo);
  }

  modificarUrocultivo(urocultivo: Urocultivo){
    return this.http.put(this.url, urocultivo);
  }
}
