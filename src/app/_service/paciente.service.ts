import { HttpClient } from '@angular/common/http';
import { Paciente } from './../_model/paciente';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pacienteCambio = new Subject<Paciente[]>();
  mensaje = new Subject<string>();  
  url: string = `${HOST}/paciente`;
  constructor(private http:HttpClient) { }

  listarpaciente(){
    return this.http.get<Paciente[]>(this.url);
  }

  listarpacienteporid(id: string){
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrarpaciente(paciente:Paciente){
    return this.http.post(this.url, paciente);
  }

  modificarpaciente(paciente:Paciente){
    return this.http.put(this.url, paciente);
  }
}
