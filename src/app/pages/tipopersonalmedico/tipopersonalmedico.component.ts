import { TipopersonalmedicoService } from './../../_service/tipopersonalmedico.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Tipopersonalmedico } from './../../_model/tipopersonalmedico';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tipopersonalmedico',
  templateUrl: './tipopersonalmedico.component.html',
  styleUrls: ['./tipopersonalmedico.component.css']
})
export class TipopersonalmedicoComponent implements OnInit {
  lista: Tipopersonalmedico[]=[];
  displayedColumns=['idtipopersonalmedico','cargopersonalmedico','descripcionpersonalmedico','acciones'];
  dataSource: MatTableDataSource<Tipopersonalmedico>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private tipopersonalmedicoService:TipopersonalmedicoService,
              private matSnackBar:MatSnackBar) { }

  ngOnInit() {
    this.tipopersonalmedicoService.tipopersonalmedicoCambio.subscribe(data => {
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.tipopersonalmedicoService.mensaje.subscribe(data => {
        this.matSnackBar.open(data, 'Aviso',{duration:2000});
      });
    });

    this.tipopersonalmedicoService.listarTipopersonal().subscribe(data => {
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
