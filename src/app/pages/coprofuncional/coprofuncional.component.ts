import { DialogcoprofuncionalComponent } from './dialogcoprofuncional/dialogcoprofuncional.component';
import { CoprofuncionalService } from './../../_service/coprofuncional.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Coprofuncional } from './../../_model/coprofuncional';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-coprofuncional',
  templateUrl: './coprofuncional.component.html',
  styleUrls: ['./coprofuncional.component.css']
})
export class CoprofuncionalComponent implements OnInit {

  coprofuncionales: Coprofuncional[] = [];
  displayedColumns = ['idcorpofuncional', 'fecha', 'nombrespaciente', 'hcl', 'observaciones', 'acciones'];
  dataSource: MatTableDataSource<Coprofuncional>;
  mensaje: string;
  copro:any ='';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private coprofuncionalService: CoprofuncionalService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.coprofuncionalService.coprofuncionalCambio.subscribe(data => {
      this.coprofuncionales = data;
      this.dataSource = new MatTableDataSource(this.coprofuncionales);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.coprofuncionalService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 4000 });
    });

    this.coprofuncionalService.listarCoprofuncional().subscribe(data => {
      this.coprofuncionales = data;
      this.dataSource = new MatTableDataSource(this.coprofuncionales);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(coprofuncional: Coprofuncional): void {
    let pro = new Coprofuncional();
    let dialogRef = this.dialog.open(DialogcoprofuncionalComponent, {
      width: '700px',
      disableClose: true,
      data: pro
    });
  }

  generatepdf(cp: Coprofuncional){
    this.coprofuncionalService.reporteCoproPaciente(cp.idcorpofuncional).subscribe(data => {
      this.copro=data;
    });
  }

}
