import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { OrdenFarmacia } from '../_model/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenfarmaciaService {

  OrdenFarmaciaCambio= new Subject<OrdenFarmacia[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/ordenfarmacia`;
  
  constructor(private http:HttpClient) { }

  listarOrdenFarmacia(){
    return this.http.get<OrdenFarmacia[]>(this.url);
  }

  listarOrdenFarmaciaId(){
    return this.http.get<OrdenFarmacia>(`${HOST}/ordenfarmacia/ultimo`) 
  }

  registrarOrdenFarmacia(ordenFarmacia: OrdenFarmacia){
    return this.http.post(this.url, ordenFarmacia);
  }

  modificarOrdenFarmacia(ordenFarmacia: OrdenFarmacia){
    return this.http.put(this.url, ordenFarmacia);
  }

}
