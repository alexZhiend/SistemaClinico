import { Params } from '@angular/router/src/shared';
import { TipopersonalmedicoService } from './../../../_service/tipopersonalmedico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tipopersonalmedico } from 'src/app/_model/tipopersonalmedico';

@Component({
  selector: 'app-tipopersonalmedico-edicion',
  templateUrl: './tipopersonalmedico-edicion.component.html',
  styleUrls: ['./tipopersonalmedico-edicion.component.css']
})
export class TipopersonalmedicoEdicionComponent implements OnInit {

  id:number;
  tipopersonalmedico:Tipopersonalmedico;
  form: FormGroup;
  edicion:boolean=false;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private tipopersonalmedicoService:TipopersonalmedicoService) {
      this.tipopersonalmedico=new Tipopersonalmedico;
                this.form=new FormGroup({
                  'id': new FormControl(0),
                  'cargo': new FormControl(''),
                  'descripcion': new FormControl(''),
                });
     }

     ngOnInit() {
      this.route.params.subscribe((params:Params)=>{
        this.id = params['id'];
        this.edicion = params['id'] != null;
        this.initForm();
      });
    }
  
    private initForm() {
      if(this.edicion){
        this.tipopersonalmedicoService.listarTipopersonalmedicoId(this.id).subscribe(data=>{
          let id = data.idtipopersonalmedico;
          let cargo = data.cargopersonalmedico;
          let descripcion = data.descripcionpersonalmedico;
  
          this.form= new FormGroup({
            'id': new FormControl(id),
            'cargo': new FormControl(cargo),
            'descripcion': new FormControl(descripcion),
          });
        });
      }
    }
  
    operar(){
      this.tipopersonalmedico.idtipopersonalmedico=this.form.value['id'];
      this.tipopersonalmedico.cargopersonalmedico=this.form.value['cargo'];
      this.tipopersonalmedico.descripcionpersonalmedico=this.form.value['descripcion'];
  
      if(this.edicion){
        this.tipopersonalmedicoService.modificarTipopersonalmedico(this.tipopersonalmedico).subscribe(data=>{
          console.log(data);
          this.tipopersonalmedicoService.listarTipopersonal().subscribe(tipospersonal =>{
            this.tipopersonalmedicoService.tipopersonalmedicoCambio.next(tipospersonal);
            this.tipopersonalmedicoService.mensaje.next('Se modificó el tipo de personal medico correctamente');
          });
        });
      }
      else{
        this.tipopersonalmedicoService.registrarTipopersonalmedico(this.tipopersonalmedico).subscribe(data =>{
          console.log(data);
          this.tipopersonalmedicoService.listarTipopersonal().subscribe(tipospersonal => {
            this.tipopersonalmedicoService.tipopersonalmedicoCambio.next(tipospersonal);
            this.tipopersonalmedicoService.mensaje.next('Se registro el tipo de personal medico correctamente');
          });
        });
      }
  
      this.router.navigate(['tipopersonalmedico']);
    }
  
  }