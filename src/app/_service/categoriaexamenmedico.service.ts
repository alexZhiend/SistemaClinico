import { Categoriaexamenmedico } from './../_model/categoriaexamenmedico';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Categoriaexamenmedico[]>(this.url)
  }

  listarCategoriaexamenmedicoId(id: number){
    return this.http.get<Categoriaexamenmedico>(`${this.url}/${id}`);
  }

  registrarCategoriaExamen(categoriaexamenmedico: Categoriaexamenmedico){
    return this.http.post(this.url, categoriaexamenmedico);
  }

  modificarCategoriaExamen(categoriaexamenmedico: Categoriaexamenmedico){
    return this.http.put(this.url, categoriaexamenmedico);
  }

}
