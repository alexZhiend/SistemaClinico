import { Params } from '@angular/router/src/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {
  id:number;
  especialidad:Especialidad;
  form: FormGroup;
  edicion:boolean=false;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private especialidadService:EspecialidadService) {
                this.especialidad=new Especialidad;
                this.form=new FormGroup({
                  'id': new FormControl(0),
                  'denominacion': new FormControl(''),
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
      this.especialidadService.listarEspecialidadid(this.id).subscribe(data=>{
        let id = data.idespecialidad;
        let denominacion = data.nombreespecialidad;

        this.form= new FormGroup({
          'id': new FormControl(id),
          'denominacion': new FormControl(denominacion),
        });
      });
    }
  }

  operar(){
    this.especialidad.idespecialidad=this.form.value['id'];
    this.especialidad.nombreespecialidad=this.form.value['denominacion'];

    if(this.edicion){
      this.especialidadService.modificarEspecialidad(this.especialidad).subscribe(data=>{
        console.log(data);
        this.especialidadService.listarEspecialidad().subscribe(especialidades =>{
          this.especialidadService.especialidadCambio.next(especialidades);
          this.especialidadService.mensaje.next('Se modificó la especialidad correctamente');
        });
      });
    }
    else{
      this.especialidadService.registrarEspecialidad(this.especialidad).subscribe(data =>{
        console.log(data);
        this.especialidadService.listarEspecialidad().subscribe(especialidades => {
          this.especialidadService.especialidadCambio.next(especialidades);
          this.especialidadService.mensaje.next('Se registro la especialidad correctamente');
        });
      });
    }

    this.router.navigate(['especialidad']);
  }

}
