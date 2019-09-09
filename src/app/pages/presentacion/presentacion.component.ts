import { PresentacionService } from './../../_service/presentacion.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Presentacionproducto } from './../../_model/presentacion';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {
  lista: Presentacionproducto[]=[];
  displayedColumns=['idpresentacionproducto','nombrepresentacionproducto','cantidadpresentacionproducto','unidadpresentacionproducto','acciones'];
  dataSource: MatTableDataSource<Presentacionproducto>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private presentacionservice:PresentacionService,
    private matSnackBar:MatSnackBar) { }

  ngOnInit() {
    this.presentacionservice.presentacionCambio.subscribe(data=>{
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.presentacionservice.mensaje.subscribe(data => {
        this.matSnackBar.open(data,'Aviso', {duration:3000});
      });
    });


    this.presentacionservice.listarPresentacion().subscribe(data => {
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
