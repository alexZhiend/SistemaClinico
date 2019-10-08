import { TOKEN_NAME } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Serviciomedico } from '../_model/serviciomedico';

@Injectable({
  providedIn: 'root'
})
export class ServiciomedicoService {

  serviciomedicoCambio = new Subject<Serviciomedico[]>();
  mensaje = new Subject<string>();
  url:string=`${HOST}/serviciomedico`

  constructor(private http:HttpClient) {   }

  listarServicioMedico(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Serviciomedico[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarServiciomedicoId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Serviciomedico>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarServiciomedico(serviciomedico: Serviciomedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, serviciomedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarServiciomedico(serviciomedico: Serviciomedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, serviciomedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
   
}
