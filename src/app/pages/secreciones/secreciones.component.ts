import { SecrecionesService } from './../../_service/secreciones.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Secreciones } from 'src/app/_model/secreciones';
import { DialogSecrecionesComponent } from './dialog-secreciones/dialog-secreciones.component';

@Component({
  selector: 'app-secreciones',
  templateUrl: './secreciones.component.html',
  styleUrls: ['./secreciones.component.css']
})
export class SecrecionesComponent implements OnInit {

  secrecioness: Secreciones[] = [];
  displayedColumns = ['idsecrecionesepmb','fecha','nombrespaciente','hcl','observaciones','acciones'];
  dataSource: MatTableDataSource<Secreciones>;
  mensaje: string;
  sec:any='';
  secr:Secreciones;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private secrecionesService:SecrecionesService,    
    public dialog:MatDialog, 
    public snackBar:MatSnackBar) { }

ngOnInit() {
      this.secrecionesService.secrecionesCambio.subscribe(data => {
        this.secrecioness = data;
        this.dataSource = new MatTableDataSource(this.secrecioness);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  
      this.secrecionesService.mensaje.subscribe(data => {
        console.log(data);
        this.snackBar.open(data, null, { duration: 2000 });
      });
  
      this.secrecionesService.listarSecreciones().subscribe(data => {
        this.secrecioness = data;
        this.dataSource = new MatTableDataSource(this.secrecioness);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }); 
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
    openDialog(secrecion: Secreciones): void {
      let pro = new Secreciones();
      let dialogRef = this.dialog.open(DialogSecrecionesComponent, {
        width: '520px',   
        disableClose: true,   
        data: pro      
      });
    }
    
    generatepdf(s: Secreciones){
      this.secrecionesService.reporteSecrecionPaciente(s.idsecrecionesepmb).subscribe(data => {
        this.sec=data;
      });
    }
    
}
