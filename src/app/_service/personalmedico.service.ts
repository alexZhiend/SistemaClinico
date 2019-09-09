import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Personalmedico[]>(this.url);
  }

  listarPersonalMedicoid(id: string){
    return this.http.get<Personalmedico>(`${this.url}/${id}`);
  }

  registrarPersonalMedico(personalmedico:Personalmedico){
    return this.http.post(this.url, personalmedico);
  }

  modificarPersonalMedico(personalmedico:Personalmedico){
    return this.http.put(this.url, personalmedico);
  }
}
