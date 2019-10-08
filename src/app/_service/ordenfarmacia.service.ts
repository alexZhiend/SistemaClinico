import { TOKEN_NAME } from './../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<OrdenFarmacia[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarOrdenFarmaciaId(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<OrdenFarmacia>(`${HOST}/ordenfarmacia/ultimo`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }) 
  }

  registrarOrdenFarmacia(ordenFarmacia: OrdenFarmacia){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, ordenFarmacia, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarOrdenFarmacia(ordenFarmacia: OrdenFarmacia){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, ordenFarmacia, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
