import { TOKEN_NAME } from './../_shared/var.constant';

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ComprobantePago } from '../_model/comprobantepago';
import { HOST } from '../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprobantepagoService {

  comprobantepagoCambio= new Subject<ComprobantePago[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/comprobantepago`;

  constructor(private http:HttpClient) { }

  listarComprobantePago(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<ComprobantePago[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarComprobantePagoId(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<ComprobantePago>(`${HOST}/comprobantepago/ultimo`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }) 
  }

  registrarComprobantePago(comprobantepago: ComprobantePago){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, comprobantepago, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
