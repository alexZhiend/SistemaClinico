import { DialoghistorialComponent } from './dialoghistorial/dialoghistorial.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { HistorialService } from './../../_service/historial.service';
import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Historial } from 'src/app/_model/historial';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historias: Historial[] = [];
  displayedColumns = ['hcl', 'dnipaciente', 'nombresyapellidos','fechadeexpedicion','acciones'];
  dataSource: MatTableDataSource<Historial>;
  mensaje: string;
  his:any='';
  hist:Historial;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pacienteservice:PacienteService,
              private historialService:HistorialService,    
              public dialog:MatDialog, 
              public snackBar:MatSnackBar
              ) {

   }

  ngOnInit() {
    this.historialService.historialCambio.subscribe(data => {
      this.historias = data;
      this.dataSource = new MatTableDataSource(this.historias);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.historialService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 2000 });
    });

    this.historialService.listarHistorial().subscribe(data => {
      this.historias = data;
      this.dataSource = new MatTableDataSource(this.historias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(historial: Historial): void {
    let pro = historial != null ? historial : new Historial();
    let dialogRef = this.dialog.open(DialoghistorialComponent, {
      width: '700px',   
      disableClose: true,   
      
      data: pro      
    });
  }

  pdf(h:Historial){
      console.log(h.idhistoriaclinica);
        this.historialService.generacionHistoria(h.idhistoriaclinica).subscribe(data=>{
          this.his=data;
        });
  }

}