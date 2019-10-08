import { TOKEN_NAME } from './../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Examenesg } from '../_model/examenesg';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class ExamenesgService {
  
  examenesgCambio= new Subject<Examenesg[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/examenesg`;

  constructor(private http:HttpClient) { }

  listarExamenesg(){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<Examenesg[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarExamenesgId(id: number){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<Examenesg>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }) 
  }

  registrarExamenesg(examenesg: Examenesg){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.post(this.url, examenesg, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificarExamenesg(examenesg: Examenesg){
        let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.put(this.url, examenesg, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
