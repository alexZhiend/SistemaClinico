import { Observable } from 'rxjs';
import { CoprofuncionalService } from './../../../_service/coprofuncional.service';
import { ComprobantepagoService } from './../../../_service/comprobantepago.service';
import { MatDialogRef, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
import { Component, OnInit } from '@angular/core';
import { Coprofuncional } from 'src/app/_model/coprofuncional';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-dialogcoprofuncional',
  templateUrl: './dialogcoprofuncional.component.html',
  styleUrls: ['./dialogcoprofuncional.component.css']
})
export class DialogcoprofuncionalComponent implements OnInit {
  coprofuncional: Coprofuncional;
  comprobantepagos: ComprobantePago[] = []; 
  idcomprobantepagoSeleccionado: number;
  form: FormGroup;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  comprobante = new FormControl();
  filteredOptions: Observable<ComprobantePago[]>;
  comprobanteseleccionado= new ComprobantePago();
  paciente:string;

  constructor(public dialogRef: MatDialogRef<DialogcoprofuncionalComponent>,
    private comprobantepagoService:ComprobantepagoService,
    private coprofuncionalService:CoprofuncionalService) {
      this.coprofuncional=new Coprofuncional();
                this.form=new FormGroup({
                  'idcorpofuncional': new FormControl(0),
                  'sudam': new FormControl(''),
                  'benedict': new FormControl(''),
                  'sangreoculta': new FormControl(''),
                  'reacinflamatoria': new FormControl(''),
                  'observaciones': new FormControl(''),
                  'fechaseleccionada': new FormControl(null),
                  'idcomprobantepagoSeleccionado': new FormControl(null),
                });
     }

 ngOnInit() {
    this.listarComprobante();

    this.filteredOptions = this.comprobante.valueChanges.pipe(
      startWith(),
      map(value => typeof value === 'string' ? value : value.numerorecibocomprobante),
      map(numerorecibocomprobante => numerorecibocomprobante ? this._filter(numerorecibocomprobante) : this.comprobantepagos.slice())
    );
  }

  
  displayFn(comprobantepago?: ComprobantePago): number | undefined {
    return comprobantepago ? comprobantepago.numerorecibocomprobante : undefined;
  }

  private _filter(numerorecibocomprobante: number): ComprobantePago[] {
    const filterValue = numerorecibocomprobante.toString().toLowerCase();
    return this.comprobantepagos.filter(comprobante => comprobante.numerorecibocomprobante.toString().toLowerCase().indexOf(filterValue) === 0);
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

  operar(){
    let comprobante = new ComprobantePago();
    comprobante.idcomprobantepago=this.comprobanteseleccionado.idcomprobantepago;
    this.coprofuncional.comprobantepago=comprobante;

    this.coprofuncional.benedict=this.form.value['benedict'];
    this.coprofuncional.sudam=this.form.value['sudam'];
    this.coprofuncional.sangreoculta=this.form.value['sangreoculta'];
    this.coprofuncional.reacinflamatoria=this.form.value['reacinflamatoria'];
    this.coprofuncional.observaciones=this.form.value['observaciones'];
    this.coprofuncional.fecha=this.fechaSeleccionada;

    if (this.form.valid === true) { 
      this.coprofuncionalService.registrarCoprofuncional(this.coprofuncional).subscribe(data =>{
        this.coprofuncionalService.listarCoprofuncional().subscribe(coprofuncional=>{
          this.coprofuncionalService.coprofuncionalCambio.next(coprofuncional);
          this.coprofuncionalService.mensaje.next("Se registró correctamente")
        });
        this.dialogRef.close();
      });
    }else{
      this.coprofuncionalService.mensaje.next("Falta algún dato requerido")
    }   
  }

  cancelar(){
    this.dialogRef.close();
    this.coprofuncionalService.mensaje.next("Se canceló el procedimiento")
  }

}
