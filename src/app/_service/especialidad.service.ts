import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Especialidad } from '../_model/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadCambio = new Subject<Especialidad[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/especialidad`;

  constructor(private http:HttpClient) { }

  listarEspecialidad(){
    return this.http.get<Especialidad[]>(this.url)
  }

  listarEspecialidadid(id: number){
    return this.http.get<Especialidad>(`${this.url}/${id}`);
  }

  registrarEspecialidad(especialidad: Especialidad){
    return this.http.post(this.url, especialidad);
  }

  modificarEspecialidad(especialidad: Especialidad){
    return this.http.put(this.url, especialidad);
  }

}
