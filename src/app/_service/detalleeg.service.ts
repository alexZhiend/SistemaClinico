import { TOKEN_NAME } from './../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { DetalleExamen } from '../_model/detalleeg';

@Injectable({
  providedIn: 'root'
})
export class DetalleegService {

  detalleExamen= new Subject<DetalleExamen[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/detalleexamen`;
  
  constructor(private http:HttpClient) { }

  listarDetalleExamen(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<DetalleExamen[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarDetalleExamenId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<DetalleExamen>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }) 
  }

  registrarDetalleExamen(detalleExamen: DetalleExamen){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, detalleExamen, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarDetalleExamen(detalleExamen: DetalleExamen){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, detalleExamen, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
  
  reporteExamenesgPaciente(id: number,fecha:string) {    
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(`${this.url}/reporteExamenesg/${id}/${fecha}`, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
