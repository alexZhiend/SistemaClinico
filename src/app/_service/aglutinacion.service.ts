import { Aglutinacion } from './../_model/aglutinaciones';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AglutinacionService {

  aglutinacionCambio= new Subject<Aglutinacion[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/aglutinacionaf`;
  
  constructor(private http:HttpClient) { }
  listarAglutinacion(){
    return this.http.get<Aglutinacion[]>(this.url);
  }

  listarAglutinaciongId(id: number){
    return this.http.get<Aglutinacion>(`${this.url}/${id}`) 
  }

  registrarAglutinacion(aglutinacion: Aglutinacion){
    return this.http.post(this.url, aglutinacion);
  }

  modificarAglutinacion(aglutinacion: Aglutinacion){
    return this.http.put(this.url, aglutinacion);
  }
}
