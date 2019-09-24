import { PersonalmedicoService } from './../../../_service/personalmedico.service';
import { ServiciomedicoService } from './../../../_service/serviciomedico.service';
import { ComprobantepagoService } from './../../../_service/comprobantepago.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Personalmedico } from './../../../_model/personalmedico';
import { ComprobantePago } from './../../../_model/comprobantepago';
import { Component, OnInit, Inject } from '@angular/core';
import { Secreciones } from 'src/app/_model/secreciones';
import { Serviciomedico } from 'src/app/_model/serviciomedico';
import { SecrecionesService } from 'src/app/_service/secreciones.service';

@Component({
  selector: 'app-dialog-secreciones',
  templateUrl: './dialog-secreciones.component.html',
  styleUrls: ['./dialog-secreciones.component.css']
})
export class DialogSecrecionesComponent implements OnInit {
  secrecion: Secreciones;
  comprobantepagos: ComprobantePago[] = []; 
  servicios:Serviciomedico[]=[];
  medicos: Personalmedico[]=[];
  idcomprobantepagoSeleccionado: number;
  denominacionserviciomedico: string;
  nombrespersonalmedico:string;
  form: FormGroup;
  tipo:any = ['vaginal','uretral'];

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  constructor(public dialogRef: MatDialogRef<DialogSecrecionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Secreciones,
    private comprobantepagoService:ComprobantepagoService,
    private serviciomedicoService:ServiciomedicoService,
    private personalmedicoService:PersonalmedicoService,
    private secrecionesService:SecrecionesService) {
      this.secrecion=new Secreciones();
        this.form=new FormGroup({
          'idsecrecionesepmb': new FormControl(0),
          'denominacionserviciomedico': new FormControl(null),
          'nombrespersonalmedico': new FormControl(null),
          'indicaciones': new FormControl(''),
          'tipoSeleccionado': new FormControl(''),
          'leucocitos': new FormControl(''),
          'hematies': new FormControl(''),
          'cepiteliales': new FormControl(''),
          'trichonomavaginalis': new FormControl(''),
          'formasfungicas': new FormControl(''),
          'germenes': new FormControl(''),
          'otros': new FormControl(''),
          'leucgram': new FormControl(''),
          'bacilosgram': new FormControl(''),
          'baciloscortosgram': new FormControl(''),
          'diplococosgram': new FormControl(''),
          'cocosgram': new FormControl(''),
          'lactobacilosgram': new FormControl(''),
          'otrosgram': new FormControl(''),
          'observaciones': new FormControl(''),
          'fechaseleccionada': new FormControl(null),
          'idcomprobantepagoSeleccionado': new FormControl(null),
        });
     }

ngOnInit() {
    this.listarComprobante();
    this.listarPersonal();
    this.listarServicio();


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
      comprobante.idcomprobantepago=this.form.value['idcomprobantepagoSeleccionado'];
      console.log(comprobante);
      this.secrecion.comprobantepago=comprobante;
      
      this.secrecion.servicio=this.form.value['denominacionserviciomedico'];

      this.secrecion.tipo=this.form.value['tipoSeleccionado'];

      this.secrecion.indicaciones=this.form.value['indicaciones'];
      this.secrecion.medico=this.form.value['nombrespersonalmedico'];
      this.secrecion.leucocitos=this.form.value['leucocitos'];
      this.secrecion.hematies=this.form.value['hematies'];
      this.secrecion.cepiteliales=this.form.value['cepiteliales'];
      this.secrecion.trichonomavaginalis=this.form.value['trichonomavaginalis'];
      this.secrecion.formasfungicas=this.form.value['formasfungicas'];
      this.secrecion.germenes=this.form.value['germenes'];
      this.secrecion.otros=this.form.value['otros'];
      this.secrecion.leucgram=this.form.value['leucgram'];
      this.secrecion.bacilosgram=this.form.value['bacilosgram'];
      this.secrecion.baciloscortosgram=this.form.value['baciloscortosgram'];
      this.secrecion.diplococosgram=this.form.value['diplococosgram'];
      this.secrecion.cocosgram=this.form.value['cocosgram'];
      this.secrecion.lactobacilosgram=this.form.value['lactobacilosgram'];
      this.secrecion.otrosgram=this.form.value['otrosgram'];
      this.secrecion.observaciones=this.form.value['observaciones'];   
      this.secrecion.fecha=this.fechaSeleccionada;

      if (this.form.valid === true) { 
        this.secrecionesService.registrarSecreciones(this.secrecion).subscribe(data =>{
          this.secrecionesService.listarSecreciones().subscribe(secrecion=>{
            this.secrecionesService.secrecionesCambio.next(secrecion);
            this.secrecionesService.mensaje.next("Se registró correctamente")
          });
          this.dialogRef.close();
        });
      }else{
        this.secrecionesService.mensaje.next("falta algun dato requerido")
      }   
  }

  cancelar(){
    this.dialogRef.close();
    this.secrecionesService.mensaje.next("Se cancelo el procedimiento")
  }
}