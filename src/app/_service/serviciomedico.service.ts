import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Serviciomedico[]>(this.url);
  }

  listarServiciomedicoId(id: number){
    return this.http.get<Serviciomedico>(`${this.url}/${id}`);
  }

  registrarServiciomedico(serviciomedico: Serviciomedico){
    return this.http.post(this.url, serviciomedico);
  }

  modificarServiciomedico(serviciomedico: Serviciomedico){
    return this.http.put(this.url, serviciomedico);
  }
   
}
