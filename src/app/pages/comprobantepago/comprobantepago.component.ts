import { Paciente } from './../../_model/paciente';
import { startWith, map } from 'rxjs/operators';
import { Serviciomedico } from './../../_model/serviciomedico';
import { MatSnackBar } from '@angular/material';
import { ServiciomedicoService } from './../../_service/serviciomedico.service';
import { PacienteService } from './../../_service/paciente.service';
import { ComprobantepagoService } from './../../_service/comprobantepago.service';
import { ComprobantePago } from './../../_model/comprobantepago';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-comprobantepago',
  templateUrl: './comprobantepago.component.html',
  styleUrls: ['./comprobantepago.component.css']
})
export class ComprobantepagoComponent implements OnInit {
  comprobantepago: ComprobantePago;

  serviciomedicos: Serviciomedico[]=[]; 
  pacientes: Paciente[] = [];

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  form: FormGroup;

  myControl=new FormControl();
  filteredOptions: Observable<Paciente[]>;

  constructor(private comprobantepagoService:ComprobantepagoService,
              private pacienteservice:PacienteService,
              private serviciomedicoService:ServiciomedicoService,
              public snackBar:MatSnackBar,
              ) { 
                this.comprobantepago=new ComprobantePago();
                this.myControl=new FormControl();
                this.form= new FormGroup({
                  'idcomprobante': new FormControl(0),
                  'numero': new FormControl(null),
                  'fechaseleccionada': new FormControl(null),
                  'hclSeleccionado': new FormControl(null),
                  'idServiciomedicoSeleccionado': new FormControl(null),
                });
              }

  ngOnInit() {
    this.listarPaciente();
    this.listarServiciomedico();
    this.comprobantepagoService.mensaje.subscribe(data=>{
    this.snackBar.open(data, null, { duration: 3000 });
    })
    this.filteredOptions=this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filtered(value))
    );
  }

  listarPaciente() {
    this.pacienteservice.listarpaciente().subscribe(data => {
      this.pacientes = data;
      console.log(this.pacientes);
    });
  }

  listarServiciomedico() {
    this.serviciomedicoService.listarServicioMedico().subscribe(data => {
      this.serviciomedicos = data;
      console.log(data);
    });
  }

  private _filtered(subject:Paciente):Paciente[]{

    this.pacienteservice.listarpaciente().subscribe(data=>{
      data=this.pacientes;
    });
    const filterValue = subject.nombrespaciente.toLowerCase();
    return this.pacientes.filter(paciente => 
    paciente.nombrespaciente.toLowerCase().includes(filterValue));
  }

  displayFn(subject){
    return subject ? subject.nombrespaciente : undefined;
  } 

  operar(){
    let paciente= new Paciente();
    paciente.hcl=this.form.value['hclSeleccionado'];
    let servicio= new Serviciomedico();
    servicio.idserviciomedico=this.form.value['idServiciomedicoSeleccionado'];
    this.comprobantepago.paciente=paciente;
    this.comprobantepago.serviciomedico=servicio;
    this.comprobantepago.numerorecibocomprobante=this.form.value['numero'];
    this.comprobantepago.fechacomprobante=this.fechaSeleccionada;

    if (this.form.valid === true) {
      console.log(this.comprobantepago);
      this.comprobantepagoService.registrarComprobantePago(this.comprobantepago).subscribe(data => {
        this.comprobantepagoService.mensaje.next("Se registró correctamente");
      })
    }else{
      this.comprobantepagoService.mensaje.next("ocurrio un error")
    }
  }

  cancelar(){
    this.form.reset();
    this.comprobantepagoService.mensaje.next('se canceló el procedimiento');
  }

}
