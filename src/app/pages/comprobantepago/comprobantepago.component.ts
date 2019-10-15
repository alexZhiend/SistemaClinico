import { ExamenmedicoService } from './../../_service/examenmedico.service';
import { Paciente } from './../../_model/paciente';
import { startWith, map } from 'rxjs/operators';
import { Serviciomedico } from './../../_model/serviciomedico';
import { MatSnackBar, MatSelectChange, MatOption, MatAutocompleteSelectedEvent, MatTableDataSource } from '@angular/material';
import { ServiciomedicoService } from './../../_service/serviciomedico.service';
import { PacienteService } from './../../_service/paciente.service';
import { ComprobantepagoService } from './../../_service/comprobantepago.service';
import { ComprobantePago } from './../../_model/comprobantepago';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExamenMedico } from 'src/app/_model/examenmedico';
import { DetalleComprobante } from 'src/app/_model/detallecomprobante';
import * as moment from 'moment';


@Component({
  selector: 'app-comprobantepago',
  templateUrl: './comprobantepago.component.html',
  styleUrls: ['./comprobantepago.component.css']
})
export class ComprobantepagoComponent implements OnInit {
  comprobantepago: ComprobantePago;
  displayedColumns = ['cantidaddetalle', 'denominacionexamen','precioexamen','importedetalle','acciones'];

  serviciomedicos: Serviciomedico[]=[]; 
  pacientes: Paciente[] = [];
  examenesmedicos: ExamenMedico[]=[];

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  form3:FormGroup;

  paciente=new FormControl();
  examen=new FormControl();

  numerocomprobante:string;
  filteredOptions: Observable<Paciente[]>;
  filteredOptions1: Observable<ExamenMedico[]>;

  pacienteseleccionado: Paciente;
  dataSource:MatTableDataSource<DetalleComprobante>;
  detalles:DetalleComprobante[]=[];
  ultimocomprobante=new ComprobantePago();
  idpacienteseleccionado:string;

  precioservicio=new Serviciomedico();
  examenseleccionado= new ExamenMedico();

  fechaSeleccionada1: Date = null;
  fechaSeleccionada2: Date = null;

  cp:any='';
  vent:any='';

  constructor(private comprobantepagoService:ComprobantepagoService,
              private pacienteservice:PacienteService,
              private serviciomedicoService:ServiciomedicoService,
              public snackBar:MatSnackBar,
              private examenmedicoService:ExamenmedicoService
              ) { 
                this.comprobantepago=new ComprobantePago();
                this.form= new FormGroup({
                  'idcomprobante': new FormControl(0),
                  'paciente': new FormControl(null),
                  'fechaseleccionada': new FormControl(null),
                  'hclSeleccionado': new FormControl(null),
                  'idServiciomedicoSeleccionado': new FormControl(null),
                  'otros':new FormControl(0.0)
                });
                this.form1= new FormGroup({
                  'farmacia': new FormControl(0.0),
                });
                this.form2= new FormGroup({
                  'topico': new FormControl(0.0),
                });
                this.form3= new FormGroup({
                  'cantidadcomprobante': new FormControl(0),
                  'examen': new FormControl(null),
                });
                this.detalles=[];
                this.pacienteseleccionado=new Paciente();
              }

  ngOnInit() {
    this.listarPaciente();
    this.listarServiciomedico();
    this.listarexamen();
    this.companterior();
    this.comprobantepagoService.mensaje.subscribe(data=>{
    this.snackBar.open(data, null, { duration: 3000 });
    })

    this.filteredOptions = this.paciente.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombresyapellidos),
        map(nombresyapellidos => nombresyapellidos ? this._filter(nombresyapellidos) : this.pacientes.slice())
      );
    
      this.filteredOptions1 = this.examen.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.denominacionexamenmedico),
        map(denominacionexamenmedico => denominacionexamenmedico ? this._filter1(denominacionexamenmedico) : this.examenesmedicos.slice())
      );

  }

  companterior(){
    this.comprobantepagoService.listarComprobantePagoId().subscribe(data=>{
      this.ultimocomprobante=data;
      if(this.ultimocomprobante!=null){
      var numero= this.ultimocomprobante.numerorecibocomprobante + 1;
      }else{
        numero=1;
      }

      let numeronuevo=numero.toString();
      let cero = "0";
      for(var _i=0;_i < 7-numeronuevo.length; _i++){
        cero=cero+"0";
      }
      this.numerocomprobante=cero+numeronuevo;
    });
  }

  listarPaciente() {
    this.pacienteservice.listarpaciente().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarServiciomedico() {
    this.serviciomedicoService.listarServicioMedico().subscribe(data => {
      this.serviciomedicos = data;
    });
  }

  listarexamen(){
    this.examenmedicoService.listarEMedico().subscribe(data =>{
      this.examenesmedicos=data;
    })
  }

  displayFn(paciente?: Paciente): string | undefined {
    return paciente ? paciente.nombresyapellidos : undefined;
  }

  displayFn1(examen?: ExamenMedico): string | undefined {
    return examen ? examen.denominacionexamenmedico : undefined;
  }

  private _filter(nombresyapellidos: string): Paciente[] {
    const filterValue = nombresyapellidos.toLowerCase();
    return this.pacientes.filter(paciente => paciente.nombresyapellidos.toLowerCase().indexOf(filterValue) === 0);
  }


  private _filter1(denominacionexamenmedico: string): ExamenMedico[] {
    const filterValue = denominacionexamenmedico.toLowerCase();
    return this.examenesmedicos.filter(examen => examen.denominacionexamenmedico.toLowerCase().indexOf(filterValue) === 0);
  }


  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.pacienteseleccionado=event.option.value;
    this.idpacienteseleccionado=this.pacienteseleccionado.hcl
  }

  onSelectionChanged1(event: MatAutocompleteSelectedEvent) {
    this.examenseleccionado=event.option.value;
    console.log(this.examenseleccionado);
  }

  servicio(event: MatSelectChange) {
    this.precioservicio=event.source.value;

  }

  agregar(){
    if (this.form3.valid===true) {
      let det = new DetalleComprobante();

      det.cantidad= this.form3.value['cantidadcomprobante'];
      det.examenMedico= this.examenseleccionado;
      det.importe=det.cantidad*det.examenMedico.precioexmenmedico;
  
      this.detalles.push(det);
      this.dataSource = new MatTableDataSource(this.detalles);
      this.form3.reset();
      this.examen.setValue("");
    }else{
      this.snackBar.open("Falta algún dato requerido del examen medico");
    }
    
  }

  getTotalCost() {
    return this.detalles.map(t => t.importe).reduce((acc, value) => acc + value, 0);
  }

  operar(){
    let paciente= new Paciente();
    let servicio2= new Serviciomedico();
    let servicio = new Serviciomedico();

    servicio=this.form.value['idServiciomedicoSeleccionado'];

    if (this.pacienteseleccionado!=null) {
      paciente.hcl=this.pacienteseleccionado.hcl;
    }else{
      paciente=null;
    }

    if (this.form.value['idServiciomedicoSeleccionado']!=null) {
      servicio2.idserviciomedico=servicio.idserviciomedico;
    }else{
      servicio2=null;
    }

    this.comprobantepago.fechacomprobante=this.fechaSeleccionada;
    this.comprobantepago.paciente = paciente;
    this.comprobantepago.serviciomedico=servicio2;
    this.comprobantepago.numerorecibocomprobante=parseInt(this.numerocomprobante);
    this.comprobantepago.detallecomprobante=this.detalles;
    this.comprobantepago.cantidadotros=this.form.value['otros'];
    this.comprobantepago.cantidadtopico=this.form2.value['topico']
    this.comprobantepago.cantidadfarmacia=this.form1.value['farmacia'];
    console.log(this.comprobantepago);

      this.comprobantepagoService.registrarComprobantePago(this.comprobantepago).subscribe(data=>{
        this.comprobantepagoService.mensaje.next("Se realizó el registro con exito");
      });
    

  }

  eliminar(transaction){
    var indice=this.detalles.indexOf(transaction);
    this.detalles.splice(indice, 1);
    this.dataSource = new MatTableDataSource(this.detalles);
    
  }

  cancelar(){
    this.form.reset();
    this.comprobantepagoService.mensaje.next('Se canceló el procedimiento');
    window.location.reload();
  }

  pdf(){
    this.comprobantepagoService.reporteComprobanteU(6).subscribe(data=>{
      this.cp=data;
    });
  }

  pdfCaja(){
    if (this.fechaSeleccionada1!=null && this.fechaSeleccionada2!=null 
      && this.fechaSeleccionada1<this.fechaSeleccionada2) {
        let s1 = moment(this.fechaSeleccionada1).format("DD-MM-YYYY");
        let s2 = moment(this.fechaSeleccionada2).format("DD-MM-YYYY");
        this.comprobantepagoService.reporteCaja(s1,s2).subscribe(data=>{
          this.vent=data;
        })
    }else{
      this.comprobantepagoService.mensaje.next('La fecha de inicio debe ser mayor a la fecha de fin');
    }
  }
}
