import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
      return this.http.get<Proveedor[]>(this.url)
  }

  listarProveedorPorId(id: number){
    return this.http.get<Proveedor>(`${this.url}/${id}`);
  }

  registrarProveedor(proveedor: Proveedor){
    return this.http.post(this.url, proveedor);
  }

  modificarProveedor(proveedor: Proveedor){
    return this.http.put(this.url, proveedor);
  }

}
