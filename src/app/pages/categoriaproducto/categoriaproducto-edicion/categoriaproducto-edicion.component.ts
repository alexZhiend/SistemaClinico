import { Params } from '@angular/router/src/shared';
import { CategoriaproductoService } from './../../../_service/categoriaproducto.service';
import { CategoriaexamenmedicoService } from './../../../_service/categoriaexamenmedico.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Categoriaproducto } from './../../../_model/categoriaproducto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoriaproducto-edicion',
  templateUrl: './categoriaproducto-edicion.component.html',
  styleUrls: ['./categoriaproducto-edicion.component.css']
})
export class CategoriaproductoEdicionComponent implements OnInit {
  id:number;
  categoriaproducto:Categoriaproducto;
  form: FormGroup;
  edicion:boolean=false;

  constructor(private categoriaproductoService:CategoriaproductoService,
            private route:ActivatedRoute,
            private router: Router) {
              this.categoriaproducto=new Categoriaproducto;
              this.form=new FormGroup({
                'id': new FormControl(0),
                'nombre': new FormControl(''),
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
      this.categoriaproductoService.listarCategoriaproductoId(this.id).subscribe(data=>{
        let id = data.idcategoriaproducto;
        let nombre = data.nombrecategoriaproducto;

        this.form= new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
        });
      });
    }
  }

  operar(){
    this.categoriaproducto.idcategoriaproducto=this.form.value['id'];
    this.categoriaproducto.nombrecategoriaproducto=this.form.value['nombre'];

    if(this.edicion){
      this.categoriaproductoService.modificarCategoriaproducto(this.categoriaproducto).subscribe(data=>{
        console.log(data);
        this.categoriaproductoService.listarCategoriaProducto().subscribe(categoriasproducto =>{
          this.categoriaproductoService.categoriaproductoCambio.next(categoriasproducto);
          this.categoriaproductoService.mensaje.next('Se modificó la categoria correctamente');
        });
      });
    }
    else{
      this.categoriaproductoService.registrarCategoriaproducto(this.categoriaproducto).subscribe(data =>{
        console.log(data);
        this.categoriaproductoService.listarCategoriaProducto().subscribe(categoriasproducto => {
          this.categoriaproductoService.categoriaproductoCambio.next(categoriasproducto);
          this.categoriaproductoService.mensaje.next('Se registro la categoria correctamente');
        });
      });
    }

    this.router.navigate(['categoriaproducto']);
  }

}
