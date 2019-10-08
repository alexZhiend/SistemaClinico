import { Observable } from 'rxjs';
import { HecesService } from './../../../_service/heces.service';
import { MatDialogRef, MatAutocompleteSelectedEvent } from '@angular/material';
import { ComprobantepagoService } from './../../../_service/comprobantepago.service';
import { ComprobantePago } from './../../../_model/comprobantepago';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Heces } from 'src/app/_model/heces';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-dialogheces',
  templateUrl: './dialogheces.component.html',
  styleUrls: ['./dialogheces.component.css']
})
export class DialoghecesComponent implements OnInit {
  heces:Heces;

  comprobantepagos: ComprobantePago[] = [];
  idcomprobantepagoSeleccionado: number;
  id:number;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  comprobante = new FormControl();
  filteredOptions: Observable<ComprobantePago[]>;
  comprobanteseleccionado= new ComprobantePago();
  paciente:string;

  constructor(public dialogRef: MatDialogRef<DialoghecesComponent>,
              private comprobantepagoService: ComprobantepagoService,
              private hecesService:HecesService) {
                this.heces=new Heces();
                this.idcomprobantepagoSeleccionado;
    this.firstFormGroup = new FormGroup({
      'idanalisisheces': new FormControl(''),
      'color': new FormControl(''),
      'aspecto': new FormControl(''),
      'sangre': new FormControl(''),
      'mucosidad': new FormControl(''),
      'leucocitos': new FormControl(''),
      'hematies': new FormControl(''),
      'observaciones': new FormControl(''),
      'parasitos':new FormControl(''),
    });
    this.secondFormGroup = new FormGroup({
      'idanalisisheces': new FormControl(''),
      'color': new FormControl(''),
      'aspecto': new FormControl(''),
      'sangre': new FormControl(''),
      'mucosidad': new FormControl(''),
      'leucocitos': new FormControl(''),
      'hematies': new FormControl(''),
      'observaciones': new FormControl(''),
      'parasitos':new FormControl(''),
    });
    this.thirdFormGroup = new FormGroup({
      'idanalisisheces': new FormControl(''),
      'color': new FormControl(''),
      'aspecto': new FormControl(''),
      'sangre': new FormControl(''),
      'mucosidad': new FormControl(''),
      'leucocitos': new FormControl(''),
      'hematies': new FormControl(''),
      'observaciones': new FormControl(''),
      'parasitos':new FormControl(''),
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

  listarComprobante() {
    this.comprobantepagoService.listarComprobantePago().subscribe(data => {
      this.comprobantepagos = data;
    })
  }

  operar(){
    let comprobante = new ComprobantePago();
    comprobante.idcomprobantepago=this.comprobanteseleccionado.idcomprobantepago;
    this.heces.comprobantepago=comprobante;
 
    this.heces.color=this.firstFormGroup.value['color'];
    this.heces.aspecto=this.firstFormGroup.value['aspecto'];
    this.heces.sangre=this.firstFormGroup.value['sangre'];
    this.heces.mucosidad=this.firstFormGroup.value['mucosidad'];
    this.heces.leucocitos=this.firstFormGroup.value['leucocitos'];
    this.heces.hematies=this.firstFormGroup.value['hematies'];
    this.heces.observaciones=this.firstFormGroup.value['observaciones'];
    this.heces.parasitos=this.firstFormGroup.value['parasitos'];
    this.heces.fecha=this.fechaSeleccionada;

    if (this.firstFormGroup.valid === true) { 
      this.hecesService.registrarHeces(this.heces).subscribe(data =>{
        this.hecesService.listarHeces().subscribe(heces=>{
          this.hecesService.hecesCambio.next(heces);
          this.hecesService.mensaje.next("Se registró correctamente")
        });
      });
    }else{
      this.hecesService.mensaje.next("Falta algún dato requerido")
    }   
  }
  operar1(){
    let comprobante = new ComprobantePago();
    comprobante.idcomprobantepago=this.comprobanteseleccionado.idcomprobantepago;
    this.heces.comprobantepago=comprobante;

    this.heces.color=this.secondFormGroup.value['color'];
    this.heces.aspecto=this.secondFormGroup.value['aspecto'];
    this.heces.sangre=this.secondFormGroup.value['sangre'];
    this.heces.mucosidad=this.secondFormGroup.value['mucosidad'];
    this.heces.leucocitos=this.secondFormGroup.value['leucocitos'];
    this.heces.hematies=this.secondFormGroup.value['hematies'];
    this.heces.parasitos=this.secondFormGroup.value['parasitos'];
    this.heces.observaciones=this.secondFormGroup.value['observaciones'];
    this.heces.fecha=this.fechaSeleccionada;

    if (this.secondFormGroup.valid === true) { 
      this.hecesService.registrarHeces(this.heces).subscribe(data =>{
        this.hecesService.listarHeces().subscribe(heces=>{
          this.hecesService.hecesCambio.next(heces);
          this.hecesService.mensaje.next("Se registró correctamente")
        });
      });
    }else{
      this.hecesService.mensaje.next("Falta algún dato requerido")
    }
    
  }
  operar2(){
    
    let comprobante = new ComprobantePago();
    comprobante.idcomprobantepago=this.comprobanteseleccionado.idcomprobantepago;
    this.heces.comprobantepago=comprobante;

    this.heces.color=this.thirdFormGroup.value['color'];
    this.heces.aspecto=this.thirdFormGroup.value['aspecto'];
    this.heces.sangre=this.thirdFormGroup.value['sangre'];
    this.heces.mucosidad=this.thirdFormGroup.value['mucosidad'];
    this.heces.leucocitos=this.thirdFormGroup.value['leucocitos'];
    this.heces.hematies=this.thirdFormGroup.value['hematies'];
    this.heces.parasitos=this.thirdFormGroup.value['parasitos'];
    this.heces.observaciones=this.thirdFormGroup.value['observaciones'];
    this.heces.fecha=this.fechaSeleccionada;

    if (this.thirdFormGroup.valid === true) { 
      this.hecesService.registrarHeces(this.heces).subscribe(data =>{
        this.hecesService.listarHeces().subscribe(heces=>{
          this.hecesService.hecesCambio.next(heces);
          this.hecesService.mensaje.next("Se registró correctamente")
        });
      });
    }else{
      this.hecesService.mensaje.next("Falta algún dato requerido")
    }
    
  }
  cancelar(){
    this.dialogRef.close();
  }
}
