import { FormGroup, FormControl } from '@angular/forms';
import { AglutinacionService } from './../../../_service/aglutinacion.service';
import { ComprobantepagoService } from './../../../_service/comprobantepago.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
import { Aglutinacion } from './../../../_model/aglutinaciones';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialogaglutinaciones',
  templateUrl: './dialogaglutinaciones.component.html',
  styleUrls: ['./dialogaglutinaciones.component.css']
})
export class DialogaglutinacionesComponent implements OnInit {
  aglutinacion: Aglutinacion;
  comprobantepagos: ComprobantePago[] = []; 
  idcomprobantepagoSeleccionado: number;
  form: FormGroup;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  constructor(public dialogRef: MatDialogRef<DialogaglutinacionesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Aglutinacion,
              private comprobantepagoService:ComprobantepagoService,
              private aglutinacionService:AglutinacionService) {
                this.aglutinacion=new Aglutinacion();
                this.form=new FormGroup({
                  'idaglutinacionaf': new FormControl(0),
                  'tiphicoO': new FormControl(null),
                  'tiphicoH': new FormControl(''),
                  'paratiphicoA': new FormControl(''),
                  'paratiphicoB': new FormControl(null),
                  'brucella': new FormControl(''),
                  'observaciones': new FormControl(''),
                  'fechaseleccionada': new FormControl(null),
                  'idcomprobantepagoSeleccionado': new FormControl(null),
                });
               }

  ngOnInit() {
    this.listarComprobante();
  }

  listarComprobante(){
    this.comprobantepagoService.listarComprobantePago().subscribe(data => { 
      this.comprobantepagos=data;
    })
  }

  operar(){
      let comprobante = new ComprobantePago();
      comprobante.idcomprobantepago=this.form.value['idcomprobantepagoSeleccionado'];
      console.log(comprobante);
      this.aglutinacion.comprobantepago=comprobante;
      
      this.aglutinacion.tiphicoO=this.form.value['tiphicoO'];
      this.aglutinacion.tiphicoH=this.form.value['tiphicoH'];
      this.aglutinacion.paratiphicoA=this.form.value['paratiphicoA'];
      this.aglutinacion.paratiphicoB=this.form.value['paratiphicoB'];
      this.aglutinacion.brucella=this.form.value['brucella'];
      this.aglutinacion.observaciones=this.form.value['observaciones'];
      this.aglutinacion.fecha=this.fechaSeleccionada;

      if (this.form.valid === true) { 
        this.aglutinacionService.registrarAglutinacion(this.aglutinacion).subscribe(data =>{
          this.aglutinacionService.listarAglutinacion().subscribe(aglutinacion=>{
            this.aglutinacionService.aglutinacionCambio.next(aglutinacion);
            this.aglutinacionService.mensaje.next("Se registró correctamente")
          });
          this.dialogRef.close();
        });
      }else{
        this.aglutinacionService.mensaje.next("falta algun dato requerido")
      }   
  }

  cancelar(){
    this.dialogRef.close();
    this.aglutinacionService.mensaje.next("Se cancelo el procedimiento")
  }
}
