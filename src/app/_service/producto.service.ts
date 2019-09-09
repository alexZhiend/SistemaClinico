import { HttpClient } from '@angular/common/http';
import { Producto } from './../_model/producto';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productosCambio = new Subject<Producto[]>();
  mensaje = new Subject<string>();  
  url: string = `${HOST}/producto`;

  constructor(private http:HttpClient) { }

  listarproductos(){
    return this.http.get<Producto[]>(this.url);
  }

  listarproductoporid(id: string){
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  registrarproducto(producto:Producto){
    return this.http.post(this.url, producto);
  }

  modificarproducto(producto:Producto){
    return this.http.put(this.url, producto);
  }

}
