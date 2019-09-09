import { Params } from '@angular/router/src/shared';
import { TipopacienteService } from './../../../_service/tipopaciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipopaciente } from './../../../_model/tipopaciente';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipopaciente-edicion',
  templateUrl: './tipopaciente-edicion.component.html',
  styleUrls: ['./tipopaciente-edicion.component.css']
})
export class TipopacienteEdicionComponent implements OnInit {
  id:number;
  tipopaciente:Tipopaciente;
  form: FormGroup;
  edicion:boolean=false;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private tipopacienteService:TipopacienteService) {
      this.tipopaciente=new Tipopaciente;
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
        this.tipopacienteService.listarTipopacienteId(this.id).subscribe(data=>{
          let id = data.idtipopaciente;
          let denominacion = data.tipopaciente;
  
          this.form= new FormGroup({
            'id': new FormControl(id),
            'denominacion': new FormControl(denominacion),
          });
        });
      }
    }
  
    operar(){
      this.tipopaciente.idtipopaciente=this.form.value['id'];
      this.tipopaciente.tipopaciente=this.form.value['denominacion'];
  
      if(this.edicion){
        this.tipopacienteService.modificarTipopaciente(this.tipopaciente).subscribe(data=>{
          console.log(data);
          this.tipopacienteService.listarTipoPaciente().subscribe(tipopacientes =>{
            this.tipopacienteService.tipopacienteCambio.next(tipopacientes);
            this.tipopacienteService.mensaje.next('Se modificó el tipo de paciente correctamente');
          });
        });
      }
      else{
        this.tipopacienteService.registrarTipopaciente(this.tipopaciente).subscribe(data =>{
          console.log(data);
          this.tipopacienteService.listarTipoPaciente().subscribe(tipopacientes => {
            this.tipopacienteService.tipopacienteCambio.next(tipopacientes);
            this.tipopacienteService.mensaje.next('Se registro el tipo de paciente correctamente');
          });
        });
      }
  
      this.router.navigate(['tipopaciente']);
    }
  
  }