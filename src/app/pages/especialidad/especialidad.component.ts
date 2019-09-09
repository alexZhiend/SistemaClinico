import { EspecialidadService } from './../../_service/especialidad.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Especialidad } from './../../_model/especialidad';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  lista: Especialidad[]=[];
  displayedColumns=['idespecialidad','nombreespecialidad','acciones'];
  dataSource: MatTableDataSource<Especialidad>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private especiaidadservice:EspecialidadService,
              private matSnackBar:MatSnackBar) { }

  ngOnInit() {

    this.especiaidadservice.especialidadCambio.subscribe(data=>{
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.especiaidadservice.mensaje.subscribe(data => {
        this.matSnackBar.open(data,'Aviso', {duration:3000});
      });
    });

    this.especiaidadservice.listarEspecialidad().subscribe(data => {
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
