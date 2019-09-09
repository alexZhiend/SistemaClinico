import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from './../../_model/paciente';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogpacienteComponent } from './dialogpaciente/dialogpaciente.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes: Paciente[] = [];
  displayedColumns = ['hcl', 'dnipaciente', 'nombrespaciente', 'apellidospaciente','tipopaciente','acciones'];
  dataSource: MatTableDataSource<Paciente>;
  mensaje: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private pacienteService:PacienteService,
    public dialog:MatDialog, 
    public snackBar:MatSnackBar) { }

ngOnInit() {
    this.pacienteService.pacienteCambio.subscribe(data => {
      this.pacientes = data;
      this.dataSource = new MatTableDataSource(this.pacientes);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.pacienteService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 2000 });
    });

    this.pacienteService.listarpaciente().subscribe(data => {
      this.pacientes = data;
      this.dataSource = new MatTableDataSource(this.pacientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }); 
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(paciente: Paciente): void {
    let pro = paciente != null ? paciente : new Paciente();
    let dialogRef = this.dialog.open(DialogpacienteComponent, {
      width: '500px',   
      disableClose: true,   
      
      data: pro      
    });
  }

  openModal(paciente: Paciente):void{
    let pac = paciente;
    let dialogref = this.dialog.open(DialogpacienteComponent,{
      data:pac
    });
  }
  
}