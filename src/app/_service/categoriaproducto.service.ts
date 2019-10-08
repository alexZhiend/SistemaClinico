import { TOKEN_NAME } from './../_shared/var.constant';
import { Categoriaproducto } from './../_model/categoriaproducto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Categoriaproducto[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
}

listarCategoriaproductoId(id: number){
  let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
  return this.http.get<Categoriaproducto>(`${this.url}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
  });
}

registrarCategoriaproducto(categoriaproducto: Categoriaproducto){
  let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
  return this.http.post(this.url, categoriaproducto, {
    headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
  });
}

modificarCategoriaproducto(categoriaproducto: Categoriaproducto){
  let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
  return this.http.put(this.url, categoriaproducto, {
    headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
  });
}

}
