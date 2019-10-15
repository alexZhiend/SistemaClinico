import { Observable } from 'rxjs';

import { MatTableDataSource, MatSnackBar, MatSelectChange, MatOption, MatAutocompleteSelectedEvent } from '@angular/material';
import { DetalleegService } from './../../_service/detalleeg.service';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
import { ComprobantepagoService } from './../../_service/comprobantepago.service';
import { ExamenesgService } from './../../_service/examenesg.service';
import { Examenesg } from './../../_model/examenesg';
import { Component, OnInit } from '@angular/core';
import { DetalleExamen } from 'src/app/_model/detalleeg';
import { FormGroup, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-detalleeg',
  templateUrl: './detalleeg.component.html',
  styleUrls: ['./detalleeg.component.css']
})
export class DetalleegComponent implements OnInit {
  examenes: Examenesg[] = [];
  comprobantepagos: ComprobantePago[] = [];

  idexamengSeleccionado: number;
  idcomprobantepagoSeleccionado: number;

  examen: DetalleExamen;
  lista: DetalleExamen[] = [];

  displayedColumns = ['examen', 'resultado', 'observaciones', 'fecha'];
  dataSource: MatTableDataSource<DetalleExamen>;

  nombreseleccionado: string;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  form: FormGroup;
  form2: FormGroup;
  numero:number;
  paciente:string;


  comprobante = new FormControl();
  filteredOptions: Observable<ComprobantePago[]>;
  comprobanteseleccionado= new ComprobantePago();

  examengeneral = new FormControl();
  filteredOptions1: Observable<Examenesg[]>;
  examenseleccionado= new Examenesg();
  ex:any='';


  constructor(private examenesgService: ExamenesgService,
    private comprobantepagoService: ComprobantepagoService,
    private detalleegService: DetalleegService,
    private matSnackBar: MatSnackBar) {
    this.examen = new DetalleExamen();
    this.form2 = new FormGroup({
      'idcomprobantepagoSeleccionado': new FormControl(null),
    });
    this.form = new FormGroup({
      'resultado': new FormControl(null),
      'observaciones': new FormControl(''),
      'fechaseleccionada': new FormControl(null),
      'idexamengSeleccionado': new FormControl(null)
    });
  }

  ngOnInit() {
    this.listarexamen();
    this.listarComprobante();

    this.detalleegService.mensaje.subscribe(data => {
      this.matSnackBar.open(data, 'Aviso', { duration: 3000 });
    });

    this.detalleegService.detalleExamen.subscribe(data => {
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
    });

    this.filteredOptions = this.comprobante.valueChanges.pipe(
      startWith(),
      map(value => typeof value === 'string' ? value : value.numerorecibocomprobante),
      map(numerorecibocomprobante => numerorecibocomprobante ? this._filter(numerorecibocomprobante) : this.comprobantepagos.slice())
    );

    this.filteredOptions1 = this.examengeneral.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.denominacion),
      map(denominacion => denominacion ? this._filter1(denominacion) : this.examenes.slice())
    );
 
  }

  listarexamen() {
    this.examenesgService.listarExamenesg().subscribe(data => {
      this.examenes = data;
    })
  }
  listarComprobante() {
    this.comprobantepagoService.listarComprobantePago().subscribe(data => {
      this.comprobantepagos = data;
    })
  }


  displayFn(comprobantepago?: ComprobantePago): number | undefined {
    return comprobantepago ? comprobantepago.numerorecibocomprobante : undefined;
  }

  displayFn1(examen?: Examenesg): string | undefined {
    return examen ? examen.denominacion : undefined;
  }

  private _filter(numerorecibocomprobante: number): ComprobantePago[] {
    const filterValue = numerorecibocomprobante.toString().toLowerCase();
    return this.comprobantepagos.filter(comprobante => comprobante.numerorecibocomprobante.toString().toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter1(denominacion: string): Examenesg[] {
    const filterValue = denominacion.toLowerCase();
    return this.examenes.filter(examen => examen.denominacion.toLowerCase().indexOf(filterValue) === 0);
  }

  
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.comprobanteseleccionado = event.option.value;
    if (this.comprobanteseleccionado.paciente==null) {
      this.paciente="Paciente externo";
    }else{
      this.paciente=this.comprobanteseleccionado.paciente.nombresyapellidos;
      console.log(this.comprobanteseleccionado);
    }

  }

  onSelectionChanged1(event: MatAutocompleteSelectedEvent) {
    this.examenseleccionado = event.option.value;
    this.nombreseleccionado=this.examenseleccionado.denominacion;
    console.log(this.examenseleccionado)
  }

  agregar() {

    let comprobante = new ComprobantePago();
    comprobante.idcomprobantepago = this.comprobanteseleccionado.idcomprobantepago;

    let exameng = new Examenesg();
    exameng.idexamenesg = this.examenseleccionado.idexamenesg;

    this.examen.examenesg = exameng;
    this.examen.comprobantepago = comprobante;
    this.examen.fecha = this.fechaSeleccionada;
    this.examen.resultado = this.form.value['resultado'];
    this.examen.observaciones = this.form.value['observaciones'];

    if (this.form.valid === true && this.form2.valid === true) {
      this.detalleegService.registrarDetalleExamen(this.examen).subscribe(data => {

        this.detalleegService.mensaje.next("El registro se realizó correctamente");
        let registro = <DetalleExamen>data;

        registro.examenesg.denominacion =this.nombreseleccionado;
        this.lista.push(registro);

        this.dataSource = new MatTableDataSource(this.lista);

        this.form.reset();
        this.examengeneral.setValue('');
      });

    } else {
      this.detalleegService.mensaje.next("Falta algun dato requerido");
    }

  }

  cancelar() {
    this.detalleegService.mensaje.next("Se canceló la operacion");
    window.location.reload();
  }

  pdf() {
    if(this.comprobanteseleccionado.idcomprobantepago>1 && this.form.value['fechaseleccionada']!=null){
      let s :string;
      s=moment(this.form.value['fechaseleccionada']).format("DD-MM-YYYY");
      console.log(s);
      let a = this.comprobanteseleccionado.idcomprobantepago;
      this.detalleegService.reporteExamenesgPaciente(a,s).subscribe(data=>{
        this.ex=data;
      })
    }else{
      this.detalleegService.mensaje.next('Debe ingresar el número de comprobante y la fecha')
    }


  }

  prueba(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue
      
    }
    this.nombreseleccionado=selectedData.text;
  }

}
