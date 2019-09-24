import { HttpClient } from '@angular/common/http';
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
    return this.http.get<DetalleExamen[]>(this.url);
  }

  listarDetalleExamenId(id: number){
    return this.http.get<DetalleExamen>(`${this.url}/${id}`) 
  }

  registrarDetalleExamen(detalleExamen: DetalleExamen){
    return this.http.post(this.url, detalleExamen);
  }

  modificarDetalleExamen(detalleExamen: DetalleExamen){
    return this.http.put(this.url, detalleExamen);
  }
  
}
