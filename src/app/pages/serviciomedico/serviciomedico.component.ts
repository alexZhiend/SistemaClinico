import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ServiciomedicoService } from './../../_service/serviciomedico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Serviciomedico } from 'src/app/_model/serviciomedico';

@Component({
  selector: 'app-serviciomedico',
  templateUrl: './serviciomedico.component.html',
  styleUrls: ['./serviciomedico.component.css']
})
export class ServiciomedicoComponent implements OnInit {

  lista: Serviciomedico[]=[];
  displayedColumns=['idserviciomedico','denominacionserviciomedico','descripcionserviciomedico','precioserviciomedico','acciones'];
  dataSource: MatTableDataSource<Serviciomedico>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private serviciomedicoService:ServiciomedicoService,
              private matSnackBar:MatSnackBar) { }

  ngOnInit() {
    this.serviciomedicoService.serviciomedicoCambio.subscribe(data => {
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.serviciomedicoService.mensaje.subscribe(data => {
        this.matSnackBar.open(data, 'Aviso',{duration:2000});
      });
    });

    this.serviciomedicoService.listarServicioMedico().subscribe(data => {
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
