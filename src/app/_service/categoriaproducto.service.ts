import { Categoriaproducto } from './../_model/categoriaproducto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaproductoService {

  categoriaproductoCambio = new Subject<Categoriaproducto[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/categoriaproducto`;

  constructor(private http:HttpClient) { }

  listarCategoriaProducto(){
    return this.http.get<Categoriaproducto[]>(this.url)
}

listarCategoriaproductoId(id: number){
  return this.http.get<Categoriaproducto>(`${this.url}/${id}`);
}

registrarCategoriaproducto(categoriaproducto: Categoriaproducto){
  return this.http.post(this.url, categoriaproducto);
}

modificarCategoriaproducto(categoriaproducto: Categoriaproducto){
  return this.http.put(this.url, categoriaproducto);
}

}
