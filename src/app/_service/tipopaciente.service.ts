import { TOKEN_NAME } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Tipopaciente } from './../_model/tipopaciente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipopacienteService {
  tipopacienteCambio = new Subject<Tipopaciente[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/tipopaciente`;

  constructor(private http: HttpClient) { }

  listarTipoPaciente(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Tipopaciente[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  listarTipopacienteId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Tipopaciente>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarTipopaciente(tipopaciente: Tipopaciente){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, tipopaciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarTipopaciente(tipopaciente: Tipopaciente){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, tipopaciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }


}
