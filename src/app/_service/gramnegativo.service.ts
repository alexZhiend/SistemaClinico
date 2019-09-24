import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GramNegativo } from './../_model/gramnegativo';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class GramnegativoService {
  gramNegativoCambio= new Subject<GramNegativo[]>();
  mensaje = new Subject<string>();
  url: string=`${HOST}/gramnegativo`;

  constructor(private http:HttpClient) { }

  listarGramNegativo(){
    return this.http.get<GramNegativo[]>(this.url);
  }

  listarGramNegativoId(id: number){
    return this.http.get<GramNegativo>(`${this.url}/${id}`) 
  }

  registrarGramNegativo(gramNegativo: GramNegativo){
    return this.http.post(this.url, gramNegativo);
  }

  modificarGramNegativo(gramNegativo: GramNegativo){
    return this.http.put(this.url, gramNegativo);
  }
}
