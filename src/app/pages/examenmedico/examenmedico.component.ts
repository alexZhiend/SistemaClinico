import { DialogexamenmedicoComponent } from './dialogexamenmedico/dialogexamenmedico.component';
import { ExamenmedicoService } from './../../_service/examenmedico.service';
import { ExamenMedico } from './../../_model/examenmedico';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-examenmedico',
  templateUrl: './examenmedico.component.html',
  styleUrls: ['./examenmedico.component.css']
})
export class ExamenmedicoComponent implements OnInit {

  examenesmedicos: ExamenMedico[] = [];
  displayedColumns = ['idexamenmedico', 'denominacionexamenmedico', 'precioexmenmedico', 'categoriaexamenmedico','acciones'];
  dataSource: MatTableDataSource<ExamenMedico>;
  mensaje: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private examenmedicoService:ExamenmedicoService,
              public dialog:MatDialog, 
              public snackBar:MatSnackBar) { }


ngOnInit() {
    this.examenmedicoService.examenmedicoCambio.subscribe(data => {
      this.examenesmedicos = data;
      this.dataSource = new MatTableDataSource(this.examenesmedicos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examenmedicoService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 2000 });
    });

    this.examenmedicoService.listarEMedico().subscribe(data => {
      this.examenesmedicos = data;

      this.dataSource = new MatTableDataSource(this.examenesmedicos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  openDialog(examenmedico: ExamenMedico): void {

    let pro = examenmedico != null ? examenmedico : new ExamenMedico();
    let dialogRef = this.dialog.open(DialogexamenmedicoComponent, {
      width: '500px',   
      disableClose: true,   
      
      data: pro      
    });
  }
  

}