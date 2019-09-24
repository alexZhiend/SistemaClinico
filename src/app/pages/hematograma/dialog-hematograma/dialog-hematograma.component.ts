import { HematogramaCService } from './../../../_service/hematograma-c.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { HematogramaC } from './../../../_model/hematogramaC';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-hematograma',
  templateUrl: './dialog-hematograma.component.html',
  styleUrls: ['./dialog-hematograma.component.css']
})
export class DialogHematogramaComponent implements OnInit {
  hematogramaC: HematogramaC;
  form: FormGroup;
  as: HematogramaC;

  constructor(public dialogRef: MatDialogRef<DialogHematogramaComponent>,
    
    private hematogramaCService:HematogramaCService, public snackbar:MatSnackBar) {
      this.hematogramaC=new HematogramaC();
      this.form=new FormGroup({
        'idhematogramacompleto': new FormControl(0),
        'neotrofilos': new FormControl(null),
        'eosinofilos': new FormControl(null),
        'basofilos': new FormControl(''),
        'monocitos': new FormControl(''),
        'linfocitos': new FormControl(''),
        'mielositos': new FormControl(''),
        'juveniles': new FormControl(''),
        'abastonados': new FormControl(''),
        'segmentados': new FormControl(''),
        });
     }

  ngOnInit() {

    this.hematogramaCService.mensaje.subscribe(data => {
      console.log(data);
      this.snackbar.open(data, null, { duration: 2000 });
    });
  }

  operar(){

      this.hematogramaC.idhematogramacompleto=this.form.value['idhematogramacompleto'];
      this.hematogramaC.abastonados=this.form.value['abastonados'];
      this.hematogramaC.basofilos=this.form.value['basofilos'];
      this.hematogramaC.eosinofilos=this.form.value['eosinofilos'];
      this.hematogramaC.juveniles=this.form.value['juveniles'];
      this.hematogramaC.linfocitos=this.form.value['linfocitos'];
      this.hematogramaC.mielositos=this.form.value['mielositos'];
      this.hematogramaC.monocitos=this.form.value['monocitos'];
      this.hematogramaC.neotrofilos=this.form.value['neotrofilos'];
      this.hematogramaC.segmentados=this.form.value['segmentados'];

      if (this.form.valid === true) { 
        this.hematogramaCService.registrarHematogramaC(this.hematogramaC).subscribe(data =>{
          this.hematogramaCService.mensaje.next("Se registró correctamente")
          this.as = <HematogramaC> data;
          
          console.log(this.as);

          localStorage.setItem('idrecuperado',String(this.as.idhematogramacompleto));
          this.dialogRef.close();
        });
      }else{
        this.hematogramaCService.mensaje.next("Falta algun dato requerido")
      }   
  }

  cancelar(){
    this.dialogRef.close();
    this.hematogramaCService.mensaje.next("Se canceló el procedimiento")
  }
}

