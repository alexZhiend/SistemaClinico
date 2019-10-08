import { TOKEN_NAME } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Proveedor } from '../_model/proveedor';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  proveedorCambio = new Subject<Proveedor[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/proveedor`;

  constructor(private http: HttpClient) { }

  listarProveedor(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      return this.http.get<Proveedor[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  listarProveedorPorId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Proveedor>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarProveedor(proveedor: Proveedor){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, proveedor, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarProveedor(proveedor: Proveedor){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, proveedor, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
