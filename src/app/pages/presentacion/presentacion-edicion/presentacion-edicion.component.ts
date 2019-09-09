import { Params } from '@angular/router/src/shared';
import { Presentacionproducto } from './../../../_model/presentacion';
import { PresentacionService } from './../../../_service/presentacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentacion-edicion',
  templateUrl: './presentacion-edicion.component.html',
  styleUrls: ['./presentacion-edicion.component.css']
})
export class PresentacionEdicionComponent implements OnInit {
  id:number;
  presentacionproducto:Presentacionproducto;
  form: FormGroup;
  edicion:boolean=false;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private presentacionService:PresentacionService) {

                this.presentacionproducto=new Presentacionproducto;
                this.form=new FormGroup({
                  'id': new FormControl(0),
                  'denominacion': new FormControl(''),
                  'cantidad': new FormControl(0),
                  'unidad': new FormControl('')
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
      this.presentacionService.listarPresentacionproductoId(this.id).subscribe(data=>{
        let id = data.idpresentacionproducto;
        let denominacion = data.nombrepresentacionproducto;
        let cantidad = data.cantidadpresentacionproducto;
        let unidad = data.unidadpresentacionproducto;
        console.log(data);
        this.form= new FormGroup({
          'id': new FormControl(id),
          'denominacion': new FormControl(denominacion),
          'cantidad': new FormControl(cantidad),
          'unidad':new FormControl(unidad),
        });
      });
    }
  }

  operar(){
    this.presentacionproducto.idpresentacionproducto=this.form.value['id'];
    this.presentacionproducto.nombrepresentacionproducto=this.form.value['denominacion'];
    this.presentacionproducto.cantidadpresentacionproducto=this.form.value['cantidad'];
    this.presentacionproducto.unidadpresentacionproducto= this.form.value['unidad']

    if(this.edicion){
      this.presentacionService.modificarPresentacionproducto(this.presentacionproducto).subscribe(data=>{
        console.log(data);
        this.presentacionService.listarPresentacion().subscribe(presentaciones =>{
          this.presentacionService.presentacionCambio.next(presentaciones);
          this.presentacionService.mensaje.next('Se modificó la presentación correctamente');
        });
      });
    }
    else{
      this.presentacionService.registrarPresentacionproducto(this.presentacionproducto).subscribe(data =>{
        console.log(data);
        this.presentacionService.listarPresentacion().subscribe(presentaciones => {
          this.presentacionService.presentacionCambio.next(presentaciones);
          this.presentacionService.mensaje.next('Se registro la presentación correctamente');
        });
      });
    }

    this.router.navigate(['presentacion']);
  }

}
