import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from 'src/app/_model/proveedor';
import { ProveedorService } from 'src/app/_service/proveedor.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  lista: Proveedor[]=[];
  displayedColumns=['idproveedor','nombreproveedor','descripcionproveedor','telefonoproveedor','direccionproveedor','correoproveedor','acciones'];
  dataSource: MatTableDataSource<Proveedor>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private proveedorService:ProveedorService,
    private matSnackBar:MatSnackBar,public route:ActivatedRoute) {
   }
   
    ngOnInit() {
      this.proveedorService.proveedorCambio.subscribe(data => {
        this.lista=data;
        this.dataSource= new MatTableDataSource(this.lista);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;

        this.proveedorService.mensaje.subscribe(data => {
          this.matSnackBar.open(data, 'Aviso',{duration:2000});
        });
      });

      this.proveedorService.listarProveedor().subscribe(data => {
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

