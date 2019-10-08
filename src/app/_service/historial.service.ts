import { TOKEN_NAME } from './../_shared/var.constant';
import { Historial } from './../_model/historial';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  historialCambio = new Subject<Historial[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/historiaclinica`;


  constructor(private http: HttpClient) { }

  listarHistorial() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Historial[]>(this.url, {headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  // listarHistorialId(id: number) {
  //   return this.http.get<Historial>(`${this.url}/${id}`)
  // }

  registrarHistorial(historial: Historial) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, historial, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarHistorial(historial: Historial) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, historial, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
