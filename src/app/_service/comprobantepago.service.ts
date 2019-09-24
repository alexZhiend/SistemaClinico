
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ComprobantePago } from '../_model/comprobantepago';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprobantepagoService {

  comprobantepagoCambio= new Subject<ComprobantePago[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/comprobantepago`;

  constructor(private http:HttpClient) { }

  listarComprobantePago(){
    return this.http.get<ComprobantePago[]>(this.url);
  }

  listarComprobantePagoId(id: number){
    return this.http.get<ComprobantePago>(`${this.url}/${id}`) 
  }

  registrarComprobantePago(comprobantepago: ComprobantePago){
    return this.http.post(this.url, comprobantepago);
  }
}
