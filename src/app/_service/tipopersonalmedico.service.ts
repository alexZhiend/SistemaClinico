import { Subject } from 'rxjs';
import { Tipopersonalmedico } from './../_model/tipopersonalmedico';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipopersonalmedicoService {

  tipopersonalmedicoCambio = new Subject<Tipopersonalmedico[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/tipopersonal`;
  constructor(private http: HttpClient) { }

  listarTipopersonal(){
    return this.http.get<Tipopersonalmedico[]>(this.url)
  }

  listarTipopersonalmedicoId(id: number){
    return this.http.get<Tipopersonalmedico>(`${this.url}/${id}`);
  }

  registrarTipopersonalmedico(tipopersonalmedico: Tipopersonalmedico){
    return this.http.post(this.url, tipopersonalmedico);
  }

  modificarTipopersonalmedico(tipopersonalmedico: Tipopersonalmedico){
    return this.http.put(this.url, tipopersonalmedico);
  }


}
