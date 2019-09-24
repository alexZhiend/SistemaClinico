import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Secreciones } from './../_model/secreciones';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class SecrecionesService {
  secrecionesCambio= new Subject<Secreciones[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/secrecionesepmb`;

  constructor(private http:HttpClient) { }

  listarSecreciones(){
    return this.http.get<Secreciones[]>(this.url);
  }

  listarSecrecionesId(id: number){
    return this.http.get<Secreciones>(`${this.url}/${id}`) 
  }

  registrarSecreciones(secreciones: Secreciones){
    return this.http.post(this.url, secreciones);
  }

  modificarSecreciones(secreciones: Secreciones){
    return this.http.put(this.url, secreciones);
  }
}
