import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Orina } from '../_model/orina';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class OrinaService {

  orinaCambio= new Subject<Orina[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/analisisorina`;

  constructor(private http:HttpClient) { }

  listarOrina(){
    return this.http.get<Orina[]>(this.url);
  }

  listarOrinaId(id: number){
    return this.http.get<Orina>(`${this.url}/${id}`) 
  }

  registrarOrina(orina: Orina){
    return this.http.post(this.url, orina);
  }

  modificarOrina(orina: Orina){
    return this.http.put(this.url, orina);
  }

}
