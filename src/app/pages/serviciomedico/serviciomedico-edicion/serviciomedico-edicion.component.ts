import { Params } from '@angular/router/src/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Serviciomedico } from './../../../_model/serviciomedico';
import { Component, OnInit } from '@angular/core';
import { ServiciomedicoService } from 'src/app/_service/serviciomedico.service';

@Component({
  selector: 'app-serviciomedico-edicion',
  templateUrl: './serviciomedico-edicion.component.html',
  styleUrls: ['./serviciomedico-edicion.component.css']
})
export class ServiciomedicoEdicionComponent implements OnInit {
  id:number;
  serviciomedico:Serviciomedico;
  form: FormGroup;
  edicion:boolean=false;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private serviciomedicoService:ServiciomedicoService) {
      this.serviciomedico=new Serviciomedico;
      this.form=new FormGroup({
        'id': new FormControl(0),
        'nombre': new FormControl(''),
        'precio':new FormControl(0),
        'descripcion':new FormControl(''),
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
    this.serviciomedicoService.listarServiciomedicoId(this.id).subscribe(data=>{
      let id = data.idserviciomedico;
      let nombre = data.denominacionserviciomedico;
      let precio = data.precioserviciomedico;
      let descripcion=data.descripcionserviciomedico; 

      this.form= new FormGroup({
        'id': new FormControl(id),
        'nombre': new FormControl(nombre),
        'precio':new FormControl(precio),
        'descripcion':new FormControl(descripcion),
      });
    });
  }
}

operar(){
  this.serviciomedico.idserviciomedico=this.form.value['id'];
  this.serviciomedico.denominacionserviciomedico=this.form.value['nombre'];
  this.serviciomedico.precioserviciomedico=this.form.value['precio'];
  this.serviciomedico.descripcionserviciomedico=this.form.value['descripcion'];

  if(this.edicion){
    this.serviciomedicoService.modificarServiciomedico(this.serviciomedico).subscribe(data=>{
      console.log(data);
      this.serviciomedicoService.listarServicioMedico().subscribe(servicios =>{
        this.serviciomedicoService.serviciomedicoCambio.next(servicios);
        this.serviciomedicoService.mensaje.next('Se modificó el servicio medico correctamente');
      });
    });
  }
  else{
    this.serviciomedicoService.registrarServiciomedico(this.serviciomedico).subscribe(data =>{
      console.log(data);
      this.serviciomedicoService.listarServicioMedico().subscribe(servicios => {
        this.serviciomedicoService.serviciomedicoCambio.next(servicios);
        this.serviciomedicoService.mensaje.next('Se registro el servicio medico correctamente');
      });
    });
  }

  this.router.navigate(['serviciomedico']);
}

}
