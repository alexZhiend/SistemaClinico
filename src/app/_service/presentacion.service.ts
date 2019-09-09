import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Presentacionproducto } from '../_model/presentacion';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  presentacionCambio = new Subject<Presentacionproducto[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/presentacionproducto`;

  constructor(private http: HttpClient) { }
  listarPresentacion(){
    return this.http.get<Presentacionproducto[]>(this.url)
  }

  listarPresentacionproductoId(id: number){
    return this.http.get<Presentacionproducto>(`${this.url}/${id}`);
  }

  registrarPresentacionproducto(presentacionproducto: Presentacionproducto){
    return this.http.post(this.url, presentacionproducto);
  }

  modificarPresentacionproducto(presentacionproducto: Presentacionproducto){
    return this.http.put(this.url, presentacionproducto);
  }

}
