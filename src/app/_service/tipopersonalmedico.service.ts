import { TOKEN_NAME } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Tipopersonalmedico } from './../_model/tipopersonalmedico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipopersonalmedicoService {

  tipopersonalmedicoCambio = new Subject<Tipopersonalmedico[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/tipopersonal`;
  constructor(private http: HttpClient) { }

  listarTipopersonal(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Tipopersonalmedico[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  listarTipopersonalmedicoId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Tipopersonalmedico>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarTipopersonalmedico(tipopersonalmedico: Tipopersonalmedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, tipopersonalmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarTipopersonalmedico(tipopersonalmedico: Tipopersonalmedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, tipopersonalmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }


}
