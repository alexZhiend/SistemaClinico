import { Params } from '@angular/router/src/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenesgService } from './../../../_service/examenesg.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Examenesg } from './../../../_model/examenesg';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examenesgenerales-edicion',
  templateUrl: './examenesgenerales-edicion.component.html',
  styleUrls: ['./examenesgenerales-edicion.component.css']
})
export class ExamenesgeneralesEdicionComponent implements OnInit {
  id:number;
  examenesg:Examenesg;
  form: FormGroup;
  edicion:boolean=false;

  constructor(private examenesgService:ExamenesgService,
    private route:ActivatedRoute,
    private router: Router) {
      this.examenesg=new Examenesg;
      this.form=new FormGroup({
        'id': new FormControl(0),
        'denominacion':new FormControl(''),
        'descripcion': new FormControl(''),
      });
     }

ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if(this.edicion){
      this.examenesgService.listarExamenesgId(this.id).subscribe(data=>{
        let id = data.idexamenesg;
        let denominacion = data.denominacion;
        let descripcion = data.descripcion
        this.form= new FormGroup({
          'id': new FormControl(id),
          'denominacion':new FormControl(denominacion),
          'descripcion': new FormControl(descripcion),
        });
      });
    }
  }

  operar(){
    this.examenesg.idexamenesg=this.form.value['id'];
    this.examenesg.denominacion=this.form.value['denominacion'];
    this.examenesg.descripcion=this.form.value['descripcion'];

    if(this.edicion){
      this.examenesgService.modificarExamenesg(this.examenesg).subscribe(data=>{
        console.log(data);
        this.examenesgService.listarExamenesg().subscribe(examenesgs =>{
          this.examenesgService.examenesgCambio.next(examenesgs);
          this.examenesgService.mensaje.next('Se modificó la categoria correctamente');
        });
      });
    }
    else{
      this.examenesgService.registrarExamenesg(this.examenesg).subscribe(data =>{
        console.log(data);
        this.examenesgService.listarExamenesg().subscribe(examenesgs => {
          this.examenesgService.examenesgCambio.next(examenesgs);
          this.examenesgService.mensaje.next('Se registro la categoria correctamente');
        });
      });
    }

    this.router.navigate(['examenesgenerales']);
  }

}