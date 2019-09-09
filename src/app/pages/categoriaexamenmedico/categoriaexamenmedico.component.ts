import { CategoriaexamenmedicoService } from './../../_service/categoriaexamenmedico.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoriaexamenmedico } from 'src/app/_model/categoriaexamenmedico';

@Component({
  selector: 'app-categoriaexamenmedico',
  templateUrl: './categoriaexamenmedico.component.html',
  styleUrls: ['./categoriaexamenmedico.component.css']
})
export class CategoriaexamenmedicoComponent implements OnInit {

  lista: Categoriaexamenmedico[]=[];
  displayedColumns=['idcategoriaexamenmedico','nombrecategoriaexamenmedico','acciones'];
  dataSource: MatTableDataSource<Categoriaexamenmedico>;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  constructor(private categoriaexamenmedicoservice:CategoriaexamenmedicoService, 
              private matSnackBar:MatSnackBar) { }

  ngOnInit() {
    
    this.categoriaexamenmedicoservice.categoriaexamenmedicoCambio.subscribe(data => {
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
      
      this.categoriaexamenmedicoservice.mensaje.subscribe(data =>{
        this.matSnackBar.open(data, 'Aviso', {duration:3000});
      });
    });
    
    
    this.categoriaexamenmedicoservice.listarCategoriaExamen().subscribe(data => {
      this.lista=data;
      this.dataSource=new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

}
