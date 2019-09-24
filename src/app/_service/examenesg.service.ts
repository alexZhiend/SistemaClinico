import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Examenesg[]>(this.url);
  }

  listarExamenesgId(id: number){
    return this.http.get<Examenesg>(`${this.url}/${id}`) 
  }

  registrarExamenesg(examenesg: Examenesg){
    return this.http.post(this.url, examenesg);
  }

  modificarExamenesg(examenesg: Examenesg){
    return this.http.put(this.url, examenesg);
  }

}
