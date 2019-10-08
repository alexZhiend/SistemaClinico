import { TOKEN_NAME } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Presentacionproducto[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  listarPresentacionproductoId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Presentacionproducto>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarPresentacionproducto(presentacionproducto: Presentacionproducto){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, presentacionproducto, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarPresentacionproducto(presentacionproducto: Presentacionproducto){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, presentacionproducto, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
