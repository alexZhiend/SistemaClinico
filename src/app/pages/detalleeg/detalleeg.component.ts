
import { MatTableDataSource, MatSnackBar, MatSelectChange, MatOption } from '@angular/material';
import { DetalleegService } from './../../_service/detalleeg.service';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
import { ComprobantepagoService } from './../../_service/comprobantepago.service';
import { ExamenesgService } from './../../_service/examenesg.service';
import { Examenesg } from './../../_model/examenesg';
import { Component, OnInit } from '@angular/core';
import { DetalleExamen } from 'src/app/_model/detalleeg';
import { FormGroup, FormControl } from '@angular/forms';

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

    this.numero=1;
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

  agregar() {

    let comprobante = new ComprobantePago();
    comprobante.idcomprobantepago = this.form2.value['idcomprobantepagoSeleccionado'];

    let exameng = new Examenesg();
    exameng.idexamenesg = this.form.value['idexamengSeleccionado'];

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

  }

  prueba(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue
      
    }
    this.nombreseleccionado=selectedData.text;
  }

}
