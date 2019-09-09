import { ExamenmedicoService } from './../../../_service/examenmedico.service';
import { CategoriaexamenmedicoService } from './../../../_service/categoriaexamenmedico.service';
import { Categoriaexamenmedico } from './../../../_model/categoriaexamenmedico';
import { Component, OnInit, Inject } from '@angular/core';
import { ExamenMedico } from 'src/app/_model/examenmedico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogexamenmedico',
  templateUrl: './dialogexamenmedico.component.html',
  styleUrls: ['./dialogexamenmedico.component.css']
})
export class DialogexamenmedicoComponent implements OnInit {

  examenmedico: ExamenMedico;
  categoriaexamenmedico: Categoriaexamenmedico[] = []; 
  idCategoriaSeleccionado: number;

  constructor(public dialogRef: MatDialogRef<DialogexamenmedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExamenMedico,
    private categoriaexamenmedicoService:CategoriaexamenmedicoService,
    private examenmedicoService:ExamenmedicoService) { }

  ngOnInit() {

      this.listarCategorias();
      this.examenmedico = new ExamenMedico();
      this.examenmedico.idexamenmedico=this.data.idexamenmedico;
      this.examenmedico.denominacionexamenmedico = this.data.denominacionexamenmedico;
      this.examenmedico.descripcionexamenmedico = this.data.descripcionexamenmedico;
      this.examenmedico.precioexmenmedico = this.data.precioexmenmedico;
      this.examenmedico.categoriaexamenmedico = this.data.categoriaexamenmedico;

      if(this.data.idexamenmedico!= null){
        this.idCategoriaSeleccionado=this.data.categoriaexamenmedico.idcategoriaexamenmedico;
      }
    }

    listarCategorias() {
      this.categoriaexamenmedicoService.listarCategoriaExamen().subscribe(data => {
        this.categoriaexamenmedico = data;
      });
    }
 
    operar(){
      
      if(this.examenmedico != null && this.examenmedico.idexamenmedico > 0){

        let categoria = new Categoriaexamenmedico();
        categoria.idcategoriaexamenmedico= this.idCategoriaSeleccionado;

        this.examenmedico.categoriaexamenmedico=categoria;

        this.examenmedicoService.modificarEMedico(this.examenmedico).subscribe(data => {
          
            this.examenmedicoService.listarEMedico().subscribe(examenmedicos => {
              this.examenmedicoService.examenmedicoCambio.next(examenmedicos);
              this.examenmedicoService.mensaje.next("Se modificó correctamente");
            });
          
        });
      }else{

        let categoria = new Categoriaexamenmedico();
        categoria.idcategoriaexamenmedico= this.idCategoriaSeleccionado;

        this.examenmedico.categoriaexamenmedico=categoria;


        this.examenmedicoService.registrarEMedico(this.examenmedico).subscribe(data => {
          
            this.examenmedicoService.listarEMedico().subscribe(examenmedicos => {
              this.examenmedicoService.examenmedicoCambio.next(examenmedicos);
              this.examenmedicoService.mensaje.next("Se registró correctamente");
            });
          
        });
      }
      this.dialogRef.close();
    }
  
    cancelar(){
      this.dialogRef.close();
      this.examenmedicoService.mensaje.next('se canceló el procedimiento');
    }
    

}
