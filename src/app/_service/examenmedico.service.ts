import { TOKEN_NAME } from './../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ExamenMedico } from '../_model/examenmedico';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class ExamenmedicoService {

  examenmedicoCambio = new Subject<ExamenMedico[]>();
  mensaje = new Subject<string>();  
  url: string = `${HOST}/examenmedico`;

  constructor(private http:HttpClient) { }

  listarEMedico(){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<ExamenMedico[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarEMedicoid(id: string){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<ExamenMedico>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrarEMedico(examenmedico:ExamenMedico){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.post(this.url, examenmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarEMedico(examenmedico:ExamenMedico){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.put(this.url, examenmedico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
