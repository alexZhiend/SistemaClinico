import { GrampositivoService } from './../../../_service/grampositivo.service';
import { GramnegativoService } from './../../../_service/gramnegativo.service';
import { GramPositivo } from './../../../_model/grampositivo';
import { GramNegativo } from './../../../_model/gramnegativo';
import { UrocultivoService } from './../../../_service/urocultivo.service';
import { ComprobantepagoService } from './../../../_service/comprobantepago.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSelectChange, MatOption } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
import { Component, OnInit, Inject } from '@angular/core';
import { Urocultivo } from 'src/app/_model/urocultivo';

@Component({
  selector: 'app-dialogurocultivo',
  templateUrl: './dialogurocultivo.component.html',
  styleUrls: ['./dialogurocultivo.component.css']
})
export class DialogurocultivoComponent implements OnInit {
  urocultivo: Urocultivo;
  comprobantepagos: ComprobantePago[] = [];
  gramNegativo:GramNegativo;
  gramPositivo:GramPositivo;
 
  idcomprobantepagoSeleccionado: number;
  form: FormGroup;

  antibiograma:any = ['negativo','positivo'];

  antibiogramaSeleccionado:string;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  show=false;
  show1=false;

  form1:FormGroup;
  form2:FormGroup;
  detalles:any=['Sensible','Resistente','Intermedio'];
  negativo1: GramNegativo;
  positivo1: GramPositivo;
  llave:string;
  constructor(public dialogRef: MatDialogRef<DialogurocultivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Urocultivo,
    private comprobantepagoService:ComprobantepagoService,
    private urocultivoService:UrocultivoService, 
    private gramnegativoService:GramnegativoService,
    private grampositivoService:GrampositivoService) {

      this.gramPositivo= new GramPositivo;
      this.gramNegativo= new GramNegativo;
      this.urocultivo=new Urocultivo();
        this.form=new FormGroup({
          'idurocultivo': new FormControl(0),
          'denominacionserviciomedico': new FormControl(null),
          'nombrespersonalmedico': new FormControl(null),
          'leucocitos': new FormControl(''),
          'hematies': new FormControl(''),
          'cepiteliales': new FormControl(''),
          'cristales': new FormControl(''),
          'germenes': new FormControl(''),
          'otros': new FormControl(''),
          'numero': new FormControl(0),
          'antibiogramaSeleccionado': new FormControl(null),
          'observaciones': new FormControl(''),
          'germenaislado': new FormControl(''),
          'fechaseleccionada': new FormControl(null),
          'idcomprobantepagoSeleccionado': new FormControl(null),
        });
        this.form1=new FormGroup({
          'idgramnegativo': new FormControl(0),
          'cefalotinaSeleccionado': new FormControl(null),
          'cefotaximinaSeleccionado': new FormControl(null),
          'ceftriazonaSeleccionado': new FormControl(null),
          'sulfatrimetSeleccionado': new FormControl(null),
          'ciprofloxacinaSeleccionado': new FormControl(null),
          'cloranfenicolSeleccionado': new FormControl(null),
          'gentamicinaSeleccionado': new FormControl(null),
          'aztreonamSeleccionado': new FormControl(null),
          'amoxclavulSeleccionado': new FormControl(null),
          'acnalidixicoSeleccionado': new FormControl(null)
        });
        this.form2=new FormGroup({
          'idgrampositivo': new FormControl(0),
          'amikacinaSeleccionado': new FormControl(null),
          'sulfatrimetSeleccionado': new FormControl(null),
          'ampicilinaSeleccionado': new FormControl(null),
          'penicilinaSeleccionado': new FormControl(null),
          'tetraciclinaSeleccionado': new FormControl(null),
          'dicloxacilinaSeleccionado': new FormControl(null),
          'oxacilinaSeleccionado': new FormControl(null),
          'cefazolinaSeleccionado': new FormControl(null),
          'ceftriazonaSeleccionado': new FormControl(null),
          'sultamicinaSeleccionado': new FormControl(null),
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
  
  prueba(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    }
    this.llave = selectedData.value;
    console.log(selectedData);
    if (selectedData.value == 'positivo') {
      this.show = true;
      this.show1 = false;
    } else {
      this.show1 = true;
      this.show = false;
    }
  }
  
cancelarsub1(){
  this.form1.reset();
  this.form2.reset();
  this.urocultivoService.mensaje.next("Se cancelo el procedimiento")
}


positivo(){
  this.gramPositivo.amikacina=this.form2.value['amikacinaSeleccionado'];
  this.gramPositivo.sulfatrimet=this.form2.value['sulfatrimetSeleccionado'];
  this.gramPositivo.ampicilina=this.form2.value['ampicilinaSeleccionado'];
  this.gramPositivo.penicilina=this.form2.value['penicilinaSeleccionado'];
  this.gramPositivo.tetraciclina=this.form2.value['tetraciclinaSeleccionado'];
  this.gramPositivo.dicloxacilina=this.form2.value['dicloxacilinaSeleccionado'];
  this.gramPositivo.oxacilina=this.form2.value['oxacilinaSeleccionado'];
  this.gramPositivo.cefazolina=this.form2.value['cefazolinaSeleccionado'];
  this.gramPositivo.ceftriazona=this.form2.value['ceftriazonaSeleccionado'];
  this.gramPositivo.sultamicina=this.form2.value['sultamicinaSeleccionado'];

  if (this.form2.valid===true) {
    this.grampositivoService.registrarGramPositivo(this.gramPositivo).subscribe(data1=>{

      this.positivo1 = <GramPositivo>data1;
      console.log(this.positivo1)
      this.grampositivoService.mensaje.next("Se agregó correctamente el antibiograma");
    });
    
  }else{
    this.grampositivoService.mensaje.next("falta algun dato requerido del antibiograma");
  }
}

negativo(){
  this.gramNegativo.cefalotina=this.form1.value['cefalotinaSeleccionado'];
  this.gramNegativo.cefotaxima=this.form1.value['cefotaximinaSeleccionado'];
  this.gramNegativo.ceftriazona=this.form1.value['ceftriazonaSeleccionado'];
  this.gramNegativo.sulfatrimet=this.form1.value['sulfatrimetSeleccionado'];
  this.gramNegativo.ciprofloxacina=this.form1.value['ciprofloxacinaSeleccionado'];
  this.gramNegativo.cloranfenicol=this.form1.value['cloranfenicolSeleccionado'];
  this.gramNegativo.gentamicina=this.form1.value['gentamicinaSeleccionado'];
  this.gramNegativo.axtreonam=this.form1.value['aztreonamSeleccionado'];
  this.gramNegativo.amoxclavul=this.form1.value['amoxclavulSeleccionado'];
  this.gramNegativo.acnalidixico=this.form1.value['acnalidixicoSeleccionado'];
  if (this.form1.valid===true) {
    this.gramnegativoService.registrarGramNegativo(this.gramNegativo).subscribe(data2=>{
      this.negativo1 = <GramNegativo> data2;
      console.log(this.negativo1);

      this.gramnegativoService.mensaje.next("Se agregó correctamente el antibiograma");
    });
    
  }else{
    this.gramnegativoService.mensaje.next("falta algun dato requerido del antibiograma");
  }
}


cancelar(){
  this.dialogRef.close();
  this.urocultivoService.mensaje.next("Se cancelo el procedimiento")
}

operar(){
  let comprobante = new ComprobantePago();
  comprobante.idcomprobantepago=this.form.value['idcomprobantepagoSeleccionado'];
  console.log(comprobante);
  this.urocultivo.comprobantepago=comprobante;
  this.urocultivo.leucocitos=this.form.value['leucocitos'];
  this.urocultivo.hematies=this.form.value['hematies'];
  this.urocultivo.cepiteliales=this.form.value['cepiteliales'];
  this.urocultivo.cristales=this.form.value['cristales'];
  this.urocultivo.germenes=this.form.value['germenes'];
  this.urocultivo.otros=this.form.value['otros'];
  this.urocultivo.numero=this.form.value['numero'];

  this.antibiogramaSeleccionado=this.form.value['antibiogramaSeleccionado'];
  this.urocultivo.antibiograma=this.antibiogramaSeleccionado;
  console.log(this.antibiogramaSeleccionado);

  this.urocultivo.observaciones=this.form.value['observaciones'];
  this.urocultivo.germenaislado=this.form.value['germenaislado'];
  this.urocultivo.otros=this.form.value['otros'];
  this.urocultivo.fecha=this.fechaSeleccionada;
  console.log(this.llave);
  if (this.llave=='positivo') {
    this.urocultivo.grampositivo=this.positivo1;
  }else if(this.llave=='negativo'){
    this.urocultivo.gramnegativo=this.negativo1;

  }

  if (this.form.valid === true) { 
    this.urocultivoService.registrarUrocultivo(this.urocultivo).subscribe(data =>{
      this.urocultivoService.listarUrocultivo().subscribe(urocultivo=>{
        this.urocultivoService.urocultivoCambio.next(urocultivo);
        this.urocultivoService.mensaje.next("Se registró correctamente")
      });
      this.dialogRef.close();
    });
  }else{
    this.urocultivoService.mensaje.next("falta algun dato requerido")
  }   
}


   

}
