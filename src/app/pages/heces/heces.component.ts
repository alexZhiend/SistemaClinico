import { DialoghecesComponent } from './dialogheces/dialogheces.component';
import { HecesService } from './../../_service/heces.service';
import { Heces } from './../../_model/heces';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-heces',
  templateUrl: './heces.component.html',
  styleUrls: ['./heces.component.css']
})
export class HecesComponent implements OnInit {
  hecess: Heces[] = [];
  displayedColumns = ['idanalisisheces', 'fecha', 'nombrespaciente', 'hcl', 'observaciones', 'acciones'];
  dataSource: MatTableDataSource<Heces>;
  mensaje: string;
  hec:any='';
  hece:Heces;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private hecesService: HecesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.hecesService.hecesCambio.subscribe(data => {
      this.hecess = data;
      this.dataSource = new MatTableDataSource(this.hecess);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.hecesService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 4000 });
    });

    this.hecesService.listarHeces().subscribe(data => {
      this.hecess = data;
      this.dataSource = new MatTableDataSource(this.hecess);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(heces: Heces): void {
    let pro = new Heces();
    let dialogRef = this.dialog.open(DialoghecesComponent, {
      width: '600px',
      disableClose: true,
      data: pro
    });
  }

  generatepdf(h:Heces) {
    this.hecesService.reporteHecesPaciente(h.idanalisisheces).subscribe(data=>{
      this.hec=data;
    })
  }

}
