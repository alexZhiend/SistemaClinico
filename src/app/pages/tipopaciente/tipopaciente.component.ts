import { TipopacienteService } from './../../_service/tipopaciente.service';
import { Tipopaciente } from './../../_model/tipopaciente';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tipopaciente',
  templateUrl: './tipopaciente.component.html',
  styleUrls: ['./tipopaciente.component.css']
})
export class TipopacienteComponent implements OnInit {
  lista: Tipopaciente[]=[];
  displayedColumns=['idtipopaciente','tipopaciente','acciones'];
  dataSource: MatTableDataSource<Tipopaciente>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private tipopacienteService:TipopacienteService,
              private matSnackBar:MatSnackBar) { }

  ngOnInit() {
    this.tipopacienteService.tipopacienteCambio.subscribe(data => {
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.tipopacienteService.mensaje.subscribe(data => {
        this.matSnackBar.open(data, 'Aviso',{duration:2000});
      });
    });

    this.tipopacienteService.listarTipoPaciente().subscribe(data => {
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
