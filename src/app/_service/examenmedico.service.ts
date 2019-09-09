import { HttpClient } from '@angular/common/http';
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
    return this.http.get<ExamenMedico[]>(this.url);
  }

  listarEMedicoid(id: string){
    return this.http.get<ExamenMedico>(`${this.url}/${id}`);
  }

  registrarEMedico(examenmedico:ExamenMedico){
    return this.http.post(this.url, examenmedico);
  }

  modificarEMedico(examenmedico:ExamenMedico){
    return this.http.put(this.url, examenmedico);
  }
}
