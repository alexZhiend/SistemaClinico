import { PersonalmedicoService } from './../../_service/personalmedico.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Personalmedico } from './../../_model/personalmedico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogPersonalmedicoComponent } from './dialog-personalmedico/dialog-personalmedico.component';

@Component({
  selector: 'app-personalmedico',
  templateUrl: './personalmedico.component.html',
  styleUrls: ['./personalmedico.component.css']
})
export class PersonalmedicoComponent implements OnInit {

  personalmedicos: Personalmedico[] = [];
  displayedColumns = ['dnipersonalmedico', 'nombrespersonalmedico', 'tipopersonalmedico','especialidad','areapersonalmedico','acciones'];
  dataSource: MatTableDataSource<Personalmedico>;
  mensaje: string;
  row:Personalmedico;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private personalmedicoService:PersonalmedicoService,
    public dialog:MatDialog, 
    public snackBar:MatSnackBar) { }

    ngOnInit() {
      this.personalmedicoService.personalCambio.subscribe(data => {
        this.personalmedicos = data;
        this.dataSource = new MatTableDataSource(this.personalmedicos);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  
      this.personalmedicoService.mensaje.subscribe(data => {
        console.log(data);
        this.snackBar.open(data, null, { duration: 2000 });
      });
  
      this.personalmedicoService.listarPersonalMedico().subscribe(data => {
        this.personalmedicos = data;
        this.dataSource = new MatTableDataSource(this.personalmedicos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }); 
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
    openDialog(personalmedico: Personalmedico): void {
      let pro = personalmedico != null ? personalmedico : new Personalmedico();
      let dialogRef = this.dialog.open(DialogPersonalmedicoComponent, {
        width: '600px',   
        disableClose: true,   
        
        data: pro      
      });
    }
  
    openModal(personalmedico: Personalmedico):void{
      let pac = personalmedico;
      let dialogref = this.dialog.open(DialogPersonalmedicoComponent,{
        data:pac
      });
    }
    
  }

