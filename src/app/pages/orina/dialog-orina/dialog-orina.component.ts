import { Observable } from 'rxjs';
import { Personalmedico } from './../../../_model/personalmedico';
import { PersonalmedicoService } from './../../../_service/personalmedico.service';
import { ServiciomedicoService } from './../../../_service/serviciomedico.service';
import { ComprobantepagoService } from './../../../_service/comprobantepago.service';
import { Orina } from './../../../_model/orina';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ComprobantePago } from './../../../_model/comprobantepago';
import { Component, OnInit, Inject } from '@angular/core';
import { OrinaService } from 'src/app/_service/orina.service';
import { Serviciomedico } from 'src/app/_model/serviciomedico';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-orina',
  templateUrl: './dialog-orina.component.html',
  styleUrls: ['./dialog-orina.component.css']
})
export class DialogOrinaComponent implements OnInit {
  orina: Orina;
  comprobantepagos: ComprobantePago[] = []; 
  servicios:Serviciomedico[]=[];
  medicos: Personalmedico[]=[];
  idcomprobantepagoSeleccionado: number;
  denominacionserviciomedico: string;
  nombrespersonalmedico:string;
  form: FormGroup;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  comprobante = new FormControl();
  filteredOptions: Observable<ComprobantePago[]>;
  comprobanteseleccionado= new ComprobantePago();
  paciente:string;

  personal = new FormControl();
  filteredOptions1: Observable<Personalmedico[]>;
  personalseleccionado= new Personalmedico();

  constructor(public dialogRef: MatDialogRef<DialogOrinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Orina,
    private comprobantepagoService:ComprobantepagoService,
    private serviciomedicoService:ServiciomedicoService,
    private personalmedicoService:PersonalmedicoService,
    private orinaService:OrinaService) {
        this.orina=new Orina();
        this.form=new FormGroup({
          'idanalisisorina': new FormControl(0),
          'denominacionserviciomedico': new FormControl(null),
          'nombrespersonalmedico': new FormControl(null),
          'color': new FormControl(''),
          'aspecto': new FormControl(''),
          'densidad': new FormControl(''),
          'reaccion': new FormControl(''),
          'leucocitos': new FormControl(''),
          'hematies': new FormControl(''),
          'cepitelial': new FormControl(''),
          'cristales': new FormControl(''),
          'cilindros': new FormControl(''),
          'germenes': new FormControl(''),
          'otros': new FormControl(''),
          'sangre': new FormControl(''),
          'urobilina': new FormControl(''),
          'bilirrubina': new FormControl(''),
          'proteinas': new FormControl(''),
          'nitritos': new FormControl(''),
          'cetonas': new FormControl(''),
          'glucosa': new FormControl(''),
          'observaciones': new FormControl(''),
          'fechaseleccionada': new FormControl(null),
          'idcomprobantepagoSeleccionado': new FormControl(null),
        });
     }

  ngOnInit() {
    this.listarComprobante();
    this.listarPersonal();
    this.listarServicio();

    this.filteredOptions = this.comprobante.valueChanges.pipe(
      startWith(),
      map(value => typeof value === 'string' ? value : value.numerorecibocomprobante),
      map(numerorecibocomprobante => numerorecibocomprobante ? this._filter(numerorecibocomprobante) : this.comprobantepagos.slice())
    );

    this.filteredOptions1 = this.personal.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombrespersonalmedico),
      map(nombrespersonalmedico => nombrespersonalmedico ? this._filter1(nombrespersonalmedico) : this.medicos.slice())
    );

  }

  displayFn(comprobantepago?: ComprobantePago): number | undefined {
    return comprobantepago ? comprobantepago.numerorecibocomprobante : undefined;
  }

  displayFn1(personalmedico?: Personalmedico): string | undefined {
    return personalmedico ? personalmedico.nombrespersonalmedico : undefined;
  }

  private _filter(numerorecibocomprobante: number): ComprobantePago[] {
    const filterValue = numerorecibocomprobante.toString().toLowerCase();
    return this.comprobantepagos.filter(comprobante => comprobante.numerorecibocomprobante.toString().toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter1(nombrespersonalmedico: string): Personalmedico[] {
    const filterValue = nombrespersonalmedico.toLowerCase();
    return this.medicos.filter(personal => personal.nombrespersonalmedico.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectionChanged1(event: MatAutocompleteSelectedEvent) {
    this.personalseleccionado = event.option.value;
    console.log(this.personalseleccionado)
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

  listarComprobante(){
    this.comprobantepagoService.listarComprobantePago().subscribe(data => { 
      this.comprobantepagos=data;
    })
  }

  listarPersonal(){
    this.serviciomedicoService.listarServicioMedico().subscribe(data => { 
      this.servicios=data;
    })
  }

  listarServicio(){
    this.personalmedicoService.listarPersonalMedico().subscribe(data => { 
      this.medicos=data;
    })
  }

operar(){
      let comprobante = new ComprobantePago();
      comprobante.idcomprobantepago=this.comprobanteseleccionado.idcomprobantepago;
      console.log(comprobante);
      this.orina.comprobantepago=comprobante;
      this.orina.servicio=this.form.value['denominacionserviciomedico'];


      this.orina.medico=this.personalseleccionado.nombrespersonalmedico;
      this.orina.color=this.form.value['color'];
      this.orina.aspecto=this.form.value['aspecto'];
      this.orina.densidad=this.form.value['densidad'];
      this.orina.reaccion=this.form.value['reaccion'];
      this.orina.leucocitos=this.form.value['leucocitos'];
      this.orina.hematies=this.form.value['hematies'];
      this.orina.cepitelial=this.form.value['cepitelial'];
      this.orina.cristales=this.form.value['cristales'];
      this.orina.cilindros=this.form.value['cilindros'];
      this.orina.germenes=this.form.value['germenes'];
      this.orina.otros=this.form.value['otros'];
      this.orina.sangre=this.form.value['sangre'];
      this.orina.urobilina=this.form.value['urobilina'];
      this.orina.bilirrubina=this.form.value['bilirrubina'];
      this.orina.proteinas=this.form.value['proteinas'];
      this.orina.nitritos=this.form.value['nitritos'];
      this.orina.cetonas=this.form.value['cetonas'];
      this.orina.glucosa=this.form.value['glucosa'];
      this.orina.observaciones=this.form.value['observaciones'];   
      this.orina.fecha=this.fechaSeleccionada;

      if (this.form.valid === true) { 
        this.orinaService.registrarOrina(this.orina).subscribe(data =>{
          this.orinaService.listarOrina().subscribe(orina=>{
            this.orinaService.orinaCambio.next(orina);
            this.orinaService.mensaje.next("Se registró correctamente")
          });
          this.dialogRef.close();
        });
      }else{
        this.orinaService.mensaje.next("falta algun dato requerido")
      }   
  }

  cancelar(){
    this.dialogRef.close();
    this.orinaService.mensaje.next("Se cancelo el procedimiento")
  }
}
