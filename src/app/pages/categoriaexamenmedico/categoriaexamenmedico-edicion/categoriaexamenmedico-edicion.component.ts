import { CategoriaexamenmedicoService } from './../../../_service/categoriaexamenmedico.service';
import { Categoriaexamenmedico } from 'src/app/_model/categoriaexamenmedico';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'app-categoriaexamenmedico-edicion',
  templateUrl: './categoriaexamenmedico-edicion.component.html',
  styleUrls: ['./categoriaexamenmedico-edicion.component.css']
})
export class CategoriaexamenmedicoEdicionComponent implements OnInit {

  id:number;
  categoriaexamenmedico:Categoriaexamenmedico;
  form: FormGroup;
  edicion:boolean=false;

  constructor(private categoriaexamenmedicoService:CategoriaexamenmedicoService,
              private route:ActivatedRoute,
              private router:Router) {
                this.categoriaexamenmedico= new Categoriaexamenmedico;
                
                this.form=new FormGroup({
                  'id': new FormControl(0),
                  'denominacion': new FormControl(''),
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
      this.categoriaexamenmedicoService.listarCategoriaexamenmedicoId(this.id).subscribe(data=>{
        let id = data.idcategoriaexamenmedico;
        let denominacion = data.nombrecategoriaexamenmedico;

        this.form= new FormGroup({
          'id': new FormControl(id),
          'denominacion': new FormControl(denominacion),
        });
      });
    }
  }
  
  operar(){
    this.categoriaexamenmedico.idcategoriaexamenmedico=this.form.value['id'];
    this.categoriaexamenmedico.nombrecategoriaexamenmedico=this.form.value['denominacion'];

    if(this.edicion){
      this.categoriaexamenmedicoService.modificarCategoriaExamen(this.categoriaexamenmedico).subscribe(data=>{
        console.log(data);
        this.categoriaexamenmedicoService.listarCategoriaExamen().subscribe(categoriasexamenmedico =>{
          this.categoriaexamenmedicoService.categoriaexamenmedicoCambio.next(categoriasexamenmedico);
          this.categoriaexamenmedicoService.mensaje.next('Se modificó la categoria correctamente');
        });
      });
    }
    else{
      this.categoriaexamenmedicoService.registrarCategoriaExamen(this.categoriaexamenmedico).subscribe(data =>{
        console.log(data);
        this.categoriaexamenmedicoService.listarCategoriaExamen().subscribe(categoriasexamenmedico => {
          this.categoriaexamenmedicoService.categoriaexamenmedicoCambio.next(categoriasexamenmedico);
          this.categoriaexamenmedicoService.mensaje.next('Se registro la categoria correctamente');
        });
      });
    }

    this.router.navigate(['categoriaexamenmedico']);
  }

}
