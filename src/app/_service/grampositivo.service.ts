import { HttpClient } from '@angular/common/http';
import { GramPositivo } from './../_model/grampositivo';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class GrampositivoService {
  gramPositivoCambio= new Subject<GramPositivo[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/grampositivo`;
  constructor(private http:HttpClient) { }

  listarGramPositivo(){
    return this.http.get<GramPositivo[]>(this.url);
  }

  listarGramPositivoId(id: number){
    return this.http.get<GramPositivo>(`${this.url}/${id}`) 
  }

  registrarGramPositivo(gramPositivo: GramPositivo){
    return this.http.post(this.url, gramPositivo);
  }

  modificarGramPositivo(gramPositivo: GramPositivo){
    return this.http.put(this.url, gramPositivo);
  }
}
