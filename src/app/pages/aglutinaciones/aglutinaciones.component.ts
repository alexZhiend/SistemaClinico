import { AglutinacionService } from './../../_service/aglutinacion.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Aglutinacion } from './../../_model/aglutinaciones';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
import { DialogaglutinacionesComponent } from './dialogaglutinaciones/dialogaglutinaciones.component';

@Component({
  selector: 'app-aglutinaciones',
  templateUrl: './aglutinaciones.component.html',
  styleUrls: ['./aglutinaciones.component.css']
})
export class AglutinacionesComponent implements OnInit {

  aglutinaciones: Aglutinacion[] = [];
  displayedColumns = ['idaglutinacionaf','observaciones','fecha','nombrespaciente','apellidospaciente','hcl','acciones'];
  dataSource: MatTableDataSource<Aglutinacion>;
  mensaje: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private aglutinacionService:AglutinacionService,    
    public dialog:MatDialog, 
    public snackBar:MatSnackBar) { }


ngOnInit() {
      this.aglutinacionService.aglutinacionCambio.subscribe(data => {
        this.aglutinaciones = data;
        this.dataSource = new MatTableDataSource(this.aglutinaciones);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  
      this.aglutinacionService.mensaje.subscribe(data => {
        console.log(data);
        this.snackBar.open(data, null, { duration: 2000 });
      });
  
      this.aglutinacionService.listarAglutinacion().subscribe(data => {
        this.aglutinaciones = data;
        this.dataSource = new MatTableDataSource(this.aglutinaciones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }); 
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
    openDialog(aglutinacion: Aglutinacion): void {
      let pro = new Aglutinacion();
      let dialogRef = this.dialog.open(DialogaglutinacionesComponent, {
        width: '500px',   
        disableClose: true,   
        data: pro      
      });
    }
    
    generatepdf(){

    }
    
}

