import { Subject } from 'rxjs';
import { Tipopaciente } from './../_model/tipopaciente';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Tipopaciente[]>(this.url)
  }

  listarTipopacienteId(id: number){
    return this.http.get<Tipopaciente>(`${this.url}/${id}`);
  }

  registrarTipopaciente(tipopaciente: Tipopaciente){
    return this.http.post(this.url, tipopaciente);
  }

  modificarTipopaciente(tipopaciente: Tipopaciente){
    return this.http.put(this.url, tipopaciente);
  }


}
