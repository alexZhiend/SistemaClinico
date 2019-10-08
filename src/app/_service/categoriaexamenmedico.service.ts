import { TOKEN_NAME } from './../_shared/var.constant';
import { Categoriaexamenmedico } from './../_model/categoriaexamenmedico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaexamenmedicoService {

  categoriaexamenmedicoCambio = new Subject<Categoriaexamenmedico[]>();
  mensaje = new Subject<string>();
  url:string=`${HOST}/categoriaexamenmedico`;

  constructor(private http:HttpClient) { 
  }

  listarCategoriaExamen(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<Categoriaexamenmedico[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  listarCategoriaexamenmedicoId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<Categoriaexamenmedico>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarCategoriaExamen(categoriaexamenmedico: Categoriaexamenmedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.post(this.url, categoriaexamenmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarCategoriaExamen(categoriaexamenmedico: Categoriaexamenmedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.put(this.url, categoriaexamenmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
