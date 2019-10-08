import { TOKEN_NAME } from './../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Personalmedico } from '../_model/personalmedico';
import { HOST } from '../_shared/var.constant';


@Injectable({
  providedIn: 'root'
})
export class PersonalmedicoService {

  personalCambio = new Subject<Personalmedico[]>();
  mensaje = new Subject<string>();  
  url: string = `${HOST}/personalmedico`;
  

  constructor(private http:HttpClient) { }

  listarPersonalMedico(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    
    return this.http.get<Personalmedico[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPersonalMedicoid(id: string){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    
    return this.http.get<Personalmedico>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarPersonalMedico(personalmedico:Personalmedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    
    return this.http.post(this.url, personalmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarPersonalMedico(personalmedico:Personalmedico){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    
    return this.http.put(this.url, personalmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
