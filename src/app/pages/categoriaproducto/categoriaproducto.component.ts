import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Categoriaproducto } from './../../_model/categoriaproducto';
import { CategoriaproductoService } from './../../_service/categoriaproducto.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categoriaproducto',
  templateUrl: './categoriaproducto.component.html',
  styleUrls: ['./categoriaproducto.component.css']
})
export class CategoriaproductoComponent implements OnInit {

  lista: Categoriaproducto[]=[];
  displayedColumns=['idcategoriaproducto','nombrecategoriaproducto','acciones'];
  dataSource: MatTableDataSource<Categoriaproducto>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private categoriaproductoservice:CategoriaproductoService,
              private matSnackBar:MatSnackBar) { }

  ngOnInit() {
    this.categoriaproductoservice.categoriaproductoCambio.subscribe(data => {
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.categoriaproductoservice.mensaje.subscribe(data =>{
        this.matSnackBar.open(data, 'Aviso',{duration:3000});
      });
    });


    this.categoriaproductoservice.listarCategoriaProducto().subscribe(data => {
      this.lista=data;
      console.log(data);
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
