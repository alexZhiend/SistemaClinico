import { Injectable } from '@angular/core';
import { HOST, TOKEN_NAME } from 'src/app/_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/app/_model/menu';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuCambio=new Subject<Menu[]>();

  private url: string = `${HOST}`;
  
  constructor(private http:HttpClient) { }

  listar(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Menu[]>(`${this.url}/menus`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
    
  }
  listarPorUsuario(nombre: string) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Menu[]>(`${this.url}/menus/usuario/${nombre}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
